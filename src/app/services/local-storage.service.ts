import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	private readonly tokenKey = 'token'
	private readonly darkModeKey = 'darkMode'

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

	getSetDarkTheme(darkMode?: boolean) {
		if(darkMode !== undefined) {
			localStorage.setItem(this.darkModeKey, darkMode ? 't' : 'f')
		}

		return localStorage.getItem(this.darkModeKey) === 't'
	}
}
