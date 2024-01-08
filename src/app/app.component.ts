import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ThemeService } from './services/theme.service'
import { Store } from '@ngrx/store'
import { getTokenFromStore } from './components/auth/store/auth.actions'

@Component({
	selector: 'app-root',
	template: '<router-outlet />',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	constructor(public themeService: ThemeService, private store: Store) {
		themeService.load()
		store.dispatch(getTokenFromStore())
	}
}
