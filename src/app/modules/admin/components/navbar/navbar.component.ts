import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { logout } from 'src/app/auth-store/auth.actions'
import { NavService } from 'src/app/services/nav.service'
import { ThemeService } from 'src/app/services/theme.service'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

	constructor(public navService: NavService, public themeService: ThemeService, public store: Store) { }

	logout() {
		this.store.dispatch(logout())
	}

	toggleSidenav() {
		this.navService.toggleSidenav()
	}

	toggleLightMode() {
		this.themeService.toggleIsDarkThemeMode()
	}
}
