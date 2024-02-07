import { Injectable, Renderer2, RendererFactory2 } from '@angular/core'
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs'
import { LocalStorageService } from './local-storage.service'

type ThemeType = 'dark' | 'light'

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private readonly renderer = this.rendererFactory.createRenderer(null, null)
	private colorScheme: ThemeType = 'dark'
	private readonly colorSchemePrefix = 'color-scheme-'

	private isDarkThemeSub$ = new BehaviorSubject(this.colorScheme)
	isDarkTheme$ = this.isDarkThemeSub$.pipe(map((val) => val === 'dark'), distinctUntilChanged())

	constructor(private localStorageService: LocalStorageService, private rendererFactory: RendererFactory2) {}

	toggleTheme() {
		this.update(this.colorScheme === 'dark' ? 'light' : 'dark')
	}

	load() {
		this.getColorScheme()
		this.renderer.addClass(document.body, this.colorSchemePrefix + this.colorScheme)
	}

	private detectPrefersColorScheme() {
		// Detect if prefers-color-scheme is supported
		if(window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
			// Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
			this.colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
		} else {
			// If the browser does not support prefers-color-scheme, set the default to dark.
			this.colorScheme = 'dark'
		}
	}

	private setColorScheme(scheme: ThemeType) {
		this.colorScheme = scheme

		// Save prefers-color-scheme to localStorage
		this.localStorageService.getSetTheme(scheme)
	}

	private getColorScheme() {
		const localStorageColorScheme = this.localStorageService.getSetTheme()
		// Check if any prefers-color-scheme is stored in localStorage
		if(localStorageColorScheme) {
			// Save prefers-color-scheme from localStorage
			this.colorScheme = localStorageColorScheme as ThemeType
		} else {
			// If no prefers-color-scheme is stored in localStorage, try to detect OS default prefers-color-scheme
			this.detectPrefersColorScheme()
		}
	}

	private update(scheme: ThemeType) {
		this.setColorScheme(scheme)

		// Remove the old color-scheme class
		this.renderer.removeClass(document.body, this.colorSchemePrefix + (this.colorScheme === 'dark' ? 'light' : 'dark'))

		// Add the new/current color-scheme class
		this.renderer.addClass(document.body, this.colorSchemePrefix + scheme)

		this.isDarkThemeSub$.next(scheme)
	}
}
