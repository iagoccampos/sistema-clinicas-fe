import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { User } from '../models/user.model'
import { JwtHelperService } from '@auth0/angular-jwt'
import { LocalStorageService } from './local-storage.service'

@Injectable({ providedIn: 'root' })
export class AuthService {
	private currentUser: User | null = null

	private readonly helper = new JwtHelperService()

	private readonly loginUrl = '/api/auth/login'

	constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService) {
		const token = localStorageService.getSetToken()

		if(token) {
			this.currentUser = this.helper.decodeToken(token)
		}
	}

	login(form: { username: string, password: string }) {
		this.http.post<{ auth: boolean, token: string }>(this.loginUrl, form).subscribe((result) => {
			if(result.auth) {
				this.currentUser = this.helper.decodeToken(result.token)
				this.localStorageService.getSetToken(result.token)
				this.router.navigate(['/clinicas'])
			}
		})
	}

	logout() {
		this.currentUser = null
		this.localStorageService.deleteToken()

		this.router.navigate(['login'])
	}

	isLoggedIn(): boolean {
		if(this.currentUser) {
			const token = this.localStorageService.getSetToken()

			if(token && this.helper.isTokenExpired(token)) {
				this.logout()
				return false
			}

			return true
		}

		return false
	}
}
