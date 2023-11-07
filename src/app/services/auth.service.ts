import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { User, UserLevel } from '../models/user.model'
import { JwtHelperService } from '@auth0/angular-jwt'
import { LocalStorageService } from './local-storage.service'
import { map } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly helper = new JwtHelperService()
	private readonly loginUrl = '/api/auth/login'

	constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService) {}

	loginAndRedirect(form: { username: string, password: string }) {
		return this.http.post<{ auth: boolean, token?: string, error?: string}>(this.loginUrl, form).pipe(
			map((res) => {
				if(res.token) {
					const user = this.helper.decodeToken<User>(res.token)

					if(user) {
						this.localStorageService.getSetToken(res.token)
						this.redirect(user)
						return { user, token: res.token }
					}
				}

				return { user: null, token: null, error: res.error }
			}),
		)
	}

	logoutAndRedirect() {
		this.localStorageService.deleteToken()
		this.router.navigate(['login'])
	}

	private redirect(user: User) {
		switch (user.level) {
			case UserLevel.Admin:
				this.router.navigate(['/admin'])
				break
			case UserLevel.Regular:
				break
		}
	}
}
