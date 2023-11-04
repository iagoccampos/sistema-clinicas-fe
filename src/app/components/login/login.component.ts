import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	hidePass = true

	readonly loginForm = new FormGroup({
		username: new FormControl('', { validators: [Validators.required, Validators.maxLength(20)], nonNullable: true }),
		password: new FormControl('', { validators: [Validators.required, Validators.maxLength(20)], nonNullable: true }),
	})

	constructor(private authService: AuthService) { }

	login() {
		this.loginForm.value
		this.authService.login(this.loginForm.getRawValue())
	}
}
