import { Injectable } from '@angular/core'
import { BehaviorSubject, distinctUntilChanged } from 'rxjs'
import { LocalStorageService } from './local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkThemeSub$ = new BehaviorSubject(this.localStorageService.getSetDarkTheme())
  isDarkTheme$ = this.isDarkThemeSub$.pipe(distinctUntilChanged())

  constructor(private localStorageService: LocalStorageService) { }

  toggleIsDarkThemeMode() {
    const toggledValue = !this.isDarkThemeSub$.getValue()

    this.isDarkThemeSub$.next(toggledValue)
    this.localStorageService.getSetDarkTheme(toggledValue)
  }
}
