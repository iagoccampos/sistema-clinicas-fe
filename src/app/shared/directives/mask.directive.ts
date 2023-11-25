/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatDate } from '@angular/common'
import { Directive, ElementRef, Inject, Input, NgZone, Optional, PLATFORM_ID, Renderer2, Self } from '@angular/core';
import { NgControl } from '@angular/forms'
import { MatDatepickerInput } from '@angular/material/datepicker'
import { MatInput } from '@angular/material/input'
import { InputMaskDirective, InputmaskOptions, createMask } from '@ngneat/input-mask'

const basicMaskConfig: InputmaskOptions<any> = { autoUnmask: true }

type MaskNames = 'rg' | 'cpf' | 'phone' | 'date'

@Directive({
	selector: 'input[appMask]',
})
export class MaskDirective extends InputMaskDirective {
	readonly matDatePickerInput: MatDatepickerInput<Date> | null = null

	readonly masks: {[key in MaskNames]: InputmaskOptions<any>} = {
		date: createMask<Date>({
			alias: 'datetime',
			inputFormat: 'dd/mm/yyyy',
			parser: (value: string) => {
				const values = value.split('/');
				const year = +values[2];
				const month = +values[1] - 1;
				const date = +values[0];

				return new Date(year, month, date);
			},
			formatter: (value: string) => {
				const date = new Date(value)

				if(this.matDatePickerInput) {
					this.matDatePickerInput.writeValue(date)
				}

				return formatDate(date, 'dd/MM/yyyy', 'pt-BR');
			},
		}),
		rg: createMask({ ...basicMaskConfig, mask: '9.999.999' }),
		cpf: createMask({ ...basicMaskConfig, mask: '999.999.999-99' }),
		phone: createMask({ ...basicMaskConfig, mask: '(99) 99999-9999' }),
	} as const

	@Input() set appMask(appMask: MaskNames) {
		this.inputMask = this.masks[appMask]
	}

	constructor(@Inject(PLATFORM_ID) platformId: string, elementRef: ElementRef<any>, renderer: Renderer2, @Optional() @Self()ngControl: NgControl | null, ngZone: NgZone, matInput: MatInput) {
		super(platformId, elementRef, renderer, ngControl, { inputSelector: 'input', isAsync: false }, ngZone)

		const inputValueAccessor = matInput['_inputValueAccessor']

		if(inputValueAccessor instanceof MatDatepickerInput) {
			this.matDatePickerInput = inputValueAccessor
			this.matDatePickerInput.dateChange.subscribe((val) => {
				if(val.value) {
					ngControl?.control?.setValue(val.value, { emitEvent: false })
				}
			})
		}
	}
}
