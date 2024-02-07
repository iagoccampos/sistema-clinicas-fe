import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { map, tap } from 'rxjs'
import { login } from './store/auth.actions'
import { selectStatus } from './store/auth.selector'
import { BaseComponent } from 'src/app/shared/components/base/base.component'

@Component({
	selector: 'app-login',
	templateUrl: './auth.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent extends BaseComponent {
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

	constructor(private readonly store: Store) {
		super()
	}

	login() {
		this.store.dispatch(login(this.loginForm.getRawValue()))
	}
}
