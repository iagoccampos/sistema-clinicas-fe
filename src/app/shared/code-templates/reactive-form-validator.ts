import { AbstractControl, FormControl } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'

export class PassErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null): boolean {
		const invalidCtrl = !!(control?.invalid && control?.parent?.dirty)
		const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty)

		return invalidCtrl || invalidParent
	}
}

export const passConf = (control: AbstractControl) => {
	const password = control.parent?.get('password')

	if(!password) {
		return { passwordMismatch: true }
	}

	if(password.value !== control.value || !control.value) {
		return { passwordMismatch: true }
	}

	return null
}
