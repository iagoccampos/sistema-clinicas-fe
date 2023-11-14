import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { toggleHidePass, login } from './store/auth.actions'
import { selectHidePass, selectStatus } from './store/auth.selector'
import { map, tap } from 'rxjs'

@Component({
	selector: 'app-login',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
	readonly hidePass$ = this.store.select(selectHidePass)
	readonly loading$ = this.store.select(selectStatus).pipe(tap((val) => {
		if(val === 'loading') {
			this.loginForm.disable()
		} else {
			this.loginForm.enable()
		}
	}), map((val) => val === 'loading'))

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
