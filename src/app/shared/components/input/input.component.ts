import { AfterViewInit, ChangeDetectionStrategy, Component, Input, SkipSelf, ViewChild } from '@angular/core'
import { ControlContainer, FormControl, FormControlName } from '@angular/forms'
import { MaskNames } from '../../directives/mask.directive'

type ErrorTypes = 'required' | 'maxlength' | 'minlength' | 'email' | 'passwordMismatch' | 'matDatepickerParse'

type InputType = 'text' | 'password' | 'date'

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	viewProviders: [
		{
			provide: ControlContainer,
			useFactory: (container: ControlContainer) => container,
			deps: [[new SkipSelf(), ControlContainer]],
		},
	],
})
export class InputComponent implements AfterViewInit {
	@Input({ required: true }) label = ''
	@Input() type: InputType = 'text'
	@Input() autocomplete: HTMLInputElement['autocomplete'] = 'one-time-code'
	@Input() mask: MaskNames | null = null
	@Input() controlName: string | null = null

	@ViewChild(FormControlName) formControl!: FormControlName

	control!: FormControl
	currentErrorMsg = ''
	maxLength = Number.MAX_SAFE_INTEGER
	hidePass = true

	constructor() {}

	ngAfterViewInit() {
		this.control = this.formControl.control

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
					case 'matDatepickerParse':
						this.currentErrorMsg = 'Data inválida.'
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
		const currentValue = this.control.value

		this.control.setValue(new Array(1000).fill('a').join(), { emitEvent: false, emitModelToViewChange: false, emitViewToModelChange: false })

		if(this.control.errors?.['maxlength']) {
			this.maxLength = this.control.errors['maxlength'].requiredLength
		}

		this.control.setValue(currentValue, { emitEvent: false, emitModelToViewChange: false, emitViewToModelChange: false })
	}

	togglePass() {
		this.hidePass = !this.hidePass
	}
}
