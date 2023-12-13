import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { takeUntil, distinctUntilChanged, Subject, map } from 'rxjs'
import { logout } from 'src/app/components/auth/store/auth.actions'
import { NavService } from 'src/app/services/nav.service'
import { ThemeService } from 'src/app/services/theme.service'

interface IMenuItem {
	label: string,
	route: string[]
}

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnDestroy {
	readonly menuItems: IMenuItem[] = [{
		label: 'Clínicas',
		route: ['clinicas'],
	}]

	private readonly destroy$ = new Subject<void>()

	readonly showDropdownMenu$ = this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
		.pipe(
			takeUntil(this.destroy$),
			distinctUntilChanged((prev, curr) => prev.matches === curr.matches),
			map((val) => val.matches ? true : false),
		)

	readonly sideNavOpen$ = this.navService.sidenavOpen$

	constructor(public navService: NavService, public themeService: ThemeService, private breakpointObserver: BreakpointObserver, public store: Store) {}

	logout() {
		this.store.dispatch(logout())
	}

	toggleSidenav() {
		this.navService.toggleSidenav()
	}

	toggleLightMode() {
		this.themeService.toggleTheme()
	}

	ngOnDestroy() {
		this.destroy$.next()
		this.destroy$.complete()
	}
}
