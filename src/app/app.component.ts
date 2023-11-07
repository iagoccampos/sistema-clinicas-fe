import { OverlayContainer } from '@angular/cdk/overlay'
import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service'
import { Store } from '@ngrx/store'
import { getTokenFromStore } from './auth-store/auth.actions'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(public themeService: ThemeService, overlayContainer: OverlayContainer, private store: Store) {
		const classList = overlayContainer.getContainerElement().classList

		themeService.isDarkTheme$.subscribe((val) => {
			if(val) {
				classList.add('dark-theme')
			} else {
				classList.remove('dark-theme')
			}
		})

		store.dispatch(getTokenFromStore())
	}
}
