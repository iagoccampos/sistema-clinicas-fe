import { coerceBooleanProperty } from '@angular/cdk/coercion'
import { ComponentRef, Directive, Input, Renderer2, ViewContainerRef } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

@Directive({
	selector: 'button[appButtonLoading]',
})
export class ButtonLoadingDirective {
	@Input({ transform: coerceBooleanProperty }) set appButtonLoading(val: boolean) {
		val ? this.show() : this.hide()
		this.matButton.disabled = val
	}

	private readonly spinner: ComponentRef<MatProgressSpinner>

	private get nativeElement(): HTMLElement {
		return this.matButton._elementRef.nativeElement
	}

	private get spinnerNativeElement(): HTMLElement {
		return this.spinner.instance._elementRef.nativeElement
	}

	constructor(private matButton: MatButton, private viewContainerRef: ViewContainerRef, private renderer: Renderer2) {
		this.spinner = this.viewContainerRef.createComponent(MatProgressSpinner)
		this.spinner.setInput('diameter', 16)
		this.spinner.setInput('mode', 'indeterminate')

		renderer.insertBefore(this.nativeElement, this.spinnerNativeElement, this.nativeElement.firstChild)
		renderer.setStyle(this.spinnerNativeElement, 'margin-right', '8px')
	}

	private show() {
		this.renderer.setStyle(this.spinnerNativeElement, 'display', 'block')
	}

	private hide() {
		this.renderer.setStyle(this.spinnerNativeElement, 'display', 'none')
	}
}
