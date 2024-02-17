import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, SkipSelf, ViewChild } from '@angular/core'
import { ControlContainer, FormControl } from '@angular/forms'
import { MaskNames } from '../../directives/mask.directive'
import { map, of, pairwise, takeUntil } from 'rxjs'
import { BaseComponent } from '../base/base.component'

type ErrorTypes = 'required' | 'maxlength' | 'minlength' | 'email' | 'passwordMismatch' | 'matDatepickerParse' | 'min' | 'notFound'

type InputType = 'text' | 'password' | 'date' | 'select' | 'currency'

interface ILabelValuePair { label: string, value: string }

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
export class InputComponent extends BaseComponent implements OnInit {
	@Input({ required: true }) label!: string
	@Input({ required: true }) controlName!: string

	@Input() type: InputType = 'text'
	@Input() hint = ''
	@Input() autocomplete: HTMLInputElement['autocomplete'] = 'on'
	@Input() mask: MaskNames | null = null

	@Input() set options(val: (ILabelValuePair | string)[]) {
		this._options = val.map((el) => {
			return typeof el === 'string' ? { label: el, value: el } : el
		})
	}

	_maxLength = Number.MAX_SAFE_INTEGER
	_hidePass = true
	_options: ILabelValuePair[] = []
	_currentErrorMsg = ''
	_statusPending = of(false)

	private control!: FormControl

	@ViewChild('input') input!: ElementRef<HTMLInputElement>

	constructor(private controlContainer: ControlContainer, private cdr: ChangeDetectorRef) {
		super()
	}

	ngOnInit() {
		this.control = this.controlContainer.control?.get(this.controlName) as FormControl

		// To solve an angular bug using ChangeDetectionStrategy.OnPush with async validation
		this.control.statusChanges.pipe(
			takeUntil(this.destroy$),
			pairwise()).subscribe(([oldStatus, newStatus]) => {
			if(oldStatus === 'PENDING' && (newStatus === 'INVALID' || newStatus === 'VALID')) {
				this.cdr.markForCheck()
			}
		})

		this._statusPending = this.control.statusChanges.pipe(
			map((status) => status === 'PENDING'),
		)

		this.checkMaxLength()

		this.control.statusChanges.subscribe((status) => {
			if(status === 'INVALID' && this.control?.errors) {
				const firstKey = Object.keys(this.control.errors)[0] as ErrorTypes

				switch (firstKey) {
					case 'required':
						this._currentErrorMsg = $localize `Campo é requerido.`
						break
					case 'minlength':
						this._currentErrorMsg = $localize `Campo deve conter no mínimo ${this.control.errors[firstKey].requiredLength} caracteres.`
						break
					case 'maxlength':
						this._currentErrorMsg = $localize `Campo deve conter no máximo ${this.control.errors[firstKey].requiredLength} caracteres.`
						break
					case 'email':
						this._currentErrorMsg = $localize `Campo deve conter um e-mail válido.`
						break
					case 'passwordMismatch':
						this._currentErrorMsg = $localize `As senhas não conferem.`
						break
					case 'matDatepickerParse':
						this._currentErrorMsg = $localize `Data inválida.`
						break
					case 'min':
						this._currentErrorMsg = $localize `Valor mínimo de ${this.control.errors[firstKey].min}` + (this.type === 'currency' ?
							$localize ` reais.` : '.')
						break
					case 'notFound':
						this._currentErrorMsg = $localize `Não encontrado.`
						break
					default:
						this._currentErrorMsg = $localize `Campo inválido.`
				}
			} else {
				this._currentErrorMsg = ''
			}
		})
	}

	private checkMaxLength() {
		const currentValue = this.control.value

		this.control.disable({ emitEvent: false })

		this.control.setValue(new Array(1000).fill('a').join(''), {
			emitEvent: false, emitModelToViewChange: false, emitViewToModelChange: false, onlySelf: true,
		})

		if(this.control.errors?.['maxlength']) {
			this._maxLength = this.control.errors['maxlength'].requiredLength
		}

		this.control.setValue(currentValue, {
			emitEvent: false, emitModelToViewChange: false, emitViewToModelChange: false,
		})

		this.control.enable({ emitEvent: false })
	}

	togglePass() {
		this._hidePass = !this._hidePass
	}
}
