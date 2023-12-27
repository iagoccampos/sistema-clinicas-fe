import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core'
import { ControlValueAccessor, FormControl, FormControlDirective, FormControlName, NgControl, NgModel } from '@angular/forms'

type ErrorTypes = 'required' | 'maxlength' | 'minlength' | 'email' | 'passwordMismatch'

type InputType = 'text' | 'password'

class NoopValueAccessor implements ControlValueAccessor {
	writeValue() {}
	registerOnChange() {}
	registerOnTouched() {}
}

function injectNgControl() {
	const ngControl = inject(NgControl, { self: true, optional: true })

	if(!ngControl) {
		throw new Error('Nenhum formControlName inserido.')
	}

	if(
		ngControl instanceof FormControlDirective ||
    ngControl instanceof FormControlName ||
    ngControl instanceof NgModel
	) {
		ngControl.valueAccessor = new NoopValueAccessor()
		return ngControl
	}

	throw new Error('...')
}

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
	@Input({ required: true }) label = ''
	@Input() type: InputType = 'text'
	@Input() autocomplete: HTMLInputElement['autocomplete'] = 'one-time-code'

	private ngControl = injectNgControl()

	control: FormControl | null = null
	currentErrorMsg = ''
	maxLength = Number.MAX_SAFE_INTEGER
	hidePass = true

	constructor() {}

	ngOnInit() {
		this.control = this.ngControl.control

		this.checkMaxLength()

		this.control.statusChanges.subscribe((status) => {
			if(status === 'INVALID' && this.control?.errors) {
				const firstKey = Object.keys(this.control.errors)[0] as ErrorTypes

				switch (firstKey) {
					case 'required':
						this.currentErrorMsg = 'Campo é requerido.'
						break
					case 'minlength':
						this.currentErrorMsg = `Campo deve conter no mínimo ${this.control.errors[firstKey].requiredLength} caracteres.`
						break
					case 'maxlength':
						this.currentErrorMsg = `Campo deve conter no máximo ${this.control.errors[firstKey].requiredLength} caracteres.`
						break
					case 'email':
						this.currentErrorMsg = 'Campo deve conter um e-mail válido.'
						break
					case 'passwordMismatch':
						this.currentErrorMsg = 'As senhas não conferem.'
						break
					default:
						this.currentErrorMsg = 'Campo inválido.'
				}
			} else {
				this.currentErrorMsg = ''
			}
		})
	}

	private checkMaxLength() {
		if(this.control) {
			const currentValue = this.control.value

			this.control.setValue(new Array(1000).fill('a').join(), { emitEvent: false })

			if(this.control.errors?.['maxlength']) {
				this.maxLength = this.control.errors['maxlength'].requiredLength
			}

			this.control.setValue(currentValue, { emitEvent: false })
		}
	}

	togglePass() {
		this.hidePass = !this.hidePass
	}
}
