import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ThemeService } from './services/theme.service'
import { Store } from '@ngrx/store'
import { getTokenFromStore } from './components/auth/store/auth.actions'

@Component({
	selector: 'app-root',
	template: '<router-outlet />',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	constructor(private themeService: ThemeService, private store: Store) {}

	ngOnInit() {
		this.themeService.load()
		this.store.dispatch(getTokenFromStore())
	}
}
