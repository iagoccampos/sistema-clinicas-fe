import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { login, toggleHidePass } from 'src/app/auth-store/auth.actions'
import { selectErrorMsg, selectHidePass, selectStatus } from 'src/app/auth-store/auth.selector'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
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
