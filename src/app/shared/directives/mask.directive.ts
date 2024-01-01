/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatDate } from '@angular/common'
import { Directive, ElementRef, Inject, Input, NgZone, Optional, PLATFORM_ID, Renderer2, Self } from '@angular/core'
import { NgControl } from '@angular/forms'
import { MatDatepickerInput } from '@angular/material/datepicker'
import { InputMaskDirective, InputmaskOptions, createMask } from '@ngneat/input-mask'

const basicMaskConfig: InputmaskOptions<any> = { autoUnmask: true }

export type MaskNames = 'rg' | 'cpf' | 'phone' | 'date' | 'cep' | 'cnpj'

@Directive({
	selector: 'input[appMask]',
})
export class MaskDirective extends InputMaskDirective {
	readonly masks: {[key in MaskNames]: InputmaskOptions<any> | null} = {
		date: createMask<Date>({
			alias: 'datetime',
			inputFormat: 'dd/mm/yyyy',
			parser: (value: string) => {
				const values = value.split('/')
				const year = +values[2]
				const month = +values[1] - 1
				const date = +values[0]

				return new Date(year, month, date)
			},
			formatter: (value: string) => {
				const date = new Date(value)

				if(this.matDatePickerInput) {
					this.matDatePickerInput.writeValue(date)
				}

				return formatDate(date, 'dd/MM/yyyy', 'pt-BR')
			},
		}),
		rg: createMask({ ...basicMaskConfig, mask: ['9.999.999', '99.999.999'], keepStatic: true }),
		cpf: createMask({ ...basicMaskConfig, mask: '999.999.999-99' }),
		phone: createMask({ ...basicMaskConfig, mask: ['(99) 9999-9999', '(99) 9 9999-9999'], keepStatic: true }),
		cep: createMask({ ...basicMaskConfig, mask: '99999-999' }),
		cnpj: createMask({ ...basicMaskConfig, mask: '99.999.999/9999-99' }),
	} as const

	@Input() set appMask(appMask: MaskNames | null) {
		if(appMask !== null) {
			this.inputMask = this.masks[appMask]
		}
	}

	constructor(@Inject(PLATFORM_ID) platformId: string, elementRef: ElementRef<any>, renderer: Renderer2, @Optional() @Self()ngControl: NgControl | null, ngZone: NgZone, @Optional() private matDatePickerInput: MatDatepickerInput<Date>) {
		super(platformId, elementRef, renderer, ngControl, { inputSelector: 'input', isAsync: false }, ngZone)

		if(matDatePickerInput) {
			matDatePickerInput.value = null
			matDatePickerInput.dateChange.subscribe((val) => {
				if(val.value) {
					ngControl?.control?.setValue(val.value, { emitEvent: false })
				}
			})
		}
	}
}
