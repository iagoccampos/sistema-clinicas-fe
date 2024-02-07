import { TestBed } from '@angular/core/testing'
import { ThemeService } from './theme.service'
import { LocalStorageService } from './local-storage.service'
import { take } from 'rxjs'

describe('ThemeService', () => {
	let themeService: ThemeService
	let isDarkTheme: boolean

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [ThemeService, LocalStorageService] })
		themeService = TestBed.inject(ThemeService)

		themeService.isDarkTheme$.pipe(take(1)).subscribe((val) => isDarkTheme = val)
	})

	it('should create', () => {
		expect(themeService).toBeTruthy()
	})

	it('should load the theme', () => {
		const getColorScheme = spyOn<any>(themeService, 'getColorScheme').and.callThrough()
		themeService.load()
		expect(getColorScheme).toHaveBeenCalled()
	})

	it('should toggle the theme', () => {
		themeService.toggleTheme()
		themeService.isDarkTheme$.pipe(take(1)).subscribe((val) => expect(val).toBe(!isDarkTheme))
	})
})
