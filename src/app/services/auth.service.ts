import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { IUser, UserLevel } from '../models/user.model'
import { JwtHelperService } from '@auth0/angular-jwt'
import { LocalStorageService } from './local-storage.service'
import { map } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly helper = new JwtHelperService()
	private readonly loginUrl = `${environment.apiV1}/api/auth/login`

	constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService) {}

	loadTokenFromStorage() {
		const token = this.localStorageService.getSetToken()

		if(token && !this.helper.isTokenExpired(token)) {
			const currentUser = this.helper.decodeToken<IUser>(token)

			if(currentUser) {
				return { currentUser, token }
			}

			return null
		}

		return null
	}

	loginAndRedirect(form: { username: string, password: string }) {
		return this.http.post<{ auth: boolean, token?: string, error?: string}>(this.loginUrl, form).pipe(
			map((res) => {
				if(res.token) {
					const user = this.helper.decodeToken<IUser>(res.token)

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

	redirect(user: IUser) {
		switch (user.level) {
			case UserLevel.Admin:
				this.router.navigate(['/admin'])
				break
			case UserLevel.Regular:
				break
		}
	}
}
