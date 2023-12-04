import { AbstractControl, FormControl } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'

export class PassErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null): boolean {
		const invalidCtrl = !!(control?.invalid && control?.parent?.dirty)
		const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty)

		return invalidCtrl || invalidParent
	}
}

export const passConfirmation = (control: AbstractControl) => {
	const password = control.get('password')
	const passwordConf = control.get('passwordConf')

	if(password?.value !== passwordConf?.value) {
		return { passwordMismatch: true }
	}

	return null
}
