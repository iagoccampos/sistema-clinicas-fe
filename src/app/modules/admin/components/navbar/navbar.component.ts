import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { NavService } from 'src/app/services/nav.service'
import { ThemeService } from 'src/app/services/theme.service'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

	constructor(private authService: AuthService, public navService: NavService, public themeService: ThemeService) { }

	logout() {
		this.authService.logoutAndRedirect()
	}

	toggleSidenav() {
		this.navService.toggleSidenav()
	}

	toggleLightMode() {
		this.themeService.toggleIsDarkThemeMode()
	}
}
