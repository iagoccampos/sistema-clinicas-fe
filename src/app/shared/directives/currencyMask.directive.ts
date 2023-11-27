/* eslint-disable @typescript-eslint/no-explicit-any */

import { Directive, ElementRef, HostListener, KeyValueDiffers, forwardRef } from '@angular/core'
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms'
import { CurrencyMaskDirective as Ng2CurrencyMaskDirective, CurrencyMaskConfig } from 'ng2-currency-mask'

export const CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => CurrencyMaskDirective),
	multi: true,
}

@Directive({
	selector: '[appCurrencyMask]',
	providers: [CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR, { provide: NG_VALIDATORS, useExisting: CurrencyMaskDirective, multi: true }],
})
export class CurrencyMaskDirective extends Ng2CurrencyMaskDirective {

	@HostListener('focus', ['$event']) private onFocus(event: InputEvent) {
		const el = (event.target as HTMLInputElement)

		el.setSelectionRange(-1, -1)
		el.focus()

		setTimeout(() => {
			el.setSelectionRange(-1, -1)
			el.focus()
		})
	}

	constructor(elementRef: ElementRef<any>, keyValueDiffers: KeyValueDiffers) {
		const config: CurrencyMaskConfig = {
			align: 'left',
			allowNegative: false,
			decimal: ',',
			precision: 2,
			prefix: 'R$ ',
			suffix: '',
			thousands: '.',
		}

		super(config, elementRef, keyValueDiffers)
	}
}
