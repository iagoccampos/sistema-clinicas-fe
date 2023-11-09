import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { toggleHidePass, login } from './store/auth.actions'
import { selectHidePass, selectStatus, selectErrorMsg } from './store/auth.selector'

@Component({
	selector: 'app-login',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
	readonly hidePass$ = this.store.select(selectHidePass)
	readonly status$ = this.store.select(selectStatus)
	readonly errorMsg$ = this.store.select(selectErrorMsg)

	readonly loginForm = new FormGroup({
		username: new FormControl('', { validators: [Validators.required, Validators.maxLength(20)], nonNullable: true }),
		password: new FormControl('', { validators: [Validators.required, Validators.maxLength(20)], nonNullable: true }),
	})

	constructor(private readonly store: Store) {}

	toggleHidePass() {
		this.store.dispatch(toggleHidePass())
	}

	login() {
		this.store.dispatch(login(this.loginForm.getRawValue()))
	}
}
