import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	private readonly tokenKey = 'token'
	private readonly themeKey = 'prefers-color'

	constructor() { }

	getSetToken(newToken?: string) {
		if(newToken) {
			localStorage.setItem(this.tokenKey, newToken)
		}

		return localStorage.getItem(this.tokenKey)
	}

	deleteToken() {
		localStorage.removeItem(this.tokenKey)
	}

	getSetTheme(theme?: string) {
		if(theme !== undefined) {
			localStorage.setItem(this.themeKey, theme)
		}

		return localStorage.getItem(this.themeKey)
	}
}
