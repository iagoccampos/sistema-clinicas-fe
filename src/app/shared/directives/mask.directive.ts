/* eslint-disable @typescript-eslint/no-explicit-any */

import { Directive, ElementRef, Inject, Input, NgZone, Optional, PLATFORM_ID, Renderer2, Self } from '@angular/core';
import { NgControl } from '@angular/forms'
import { InputMaskDirective, InputmaskOptions, createMask } from '@ngneat/input-mask'

const basicMaskConfig: InputmaskOptions<any> = { autoUnmask: true }

const masks = {
	rg: createMask({ ...basicMaskConfig, mask: '9.999.999' }),
	cpf: createMask({ ...basicMaskConfig, mask: '999.999.999-99' }),
	phone: createMask({ ...basicMaskConfig, mask: '(99) 99999-9999' }),
} as const

export type MaskNames = keyof(typeof masks)

@Directive({
	selector: 'input[appMask]',
})
export class MaskDirective extends InputMaskDirective {
	@Input() set appMask(appMask: MaskNames) {
		this.inputMask = masks[appMask]
	}

	constructor(@Inject(PLATFORM_ID) platformId: string, elementRef: ElementRef<any>, renderer: Renderer2, @Optional() @Self()ngControl: NgControl | null, ngZone: NgZone) {
		super(platformId, elementRef, renderer, ngControl, { inputSelector: 'input', isAsync: false }, ngZone)
	}
}
