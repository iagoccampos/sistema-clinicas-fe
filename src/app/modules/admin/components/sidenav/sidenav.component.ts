import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core'
import { MatSidenav } from '@angular/material/sidenav'
import { NavigationEnd, NavigationSkipped, Router } from '@angular/router'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { BehaviorSubject, distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs'
import { NavService } from 'src/app/services/nav.service'
import { INavItem } from './nav-list-item/nav-list-item.component'
import { IClinic } from 'src/app/models/clinic.model'
import { ClinicService } from 'src/app/services/clinic.service'
import { BaseComponent } from 'src/app/shared/components/base/base.component'

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent extends BaseComponent implements OnInit {
	@ViewChild(MatSidenav) private sideNav: MatSidenav | null = null

	readonly clinic: IClinic | null = null

	// Quando a tela ficar menor que o Medio, troca para over
	readonly mode$ = this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
		.pipe(
			takeUntil(this.destroy$),
			distinctUntilChanged((prev, curr) => prev.matches === curr.matches),
			map((val) => val.matches ? 'over' : 'side'),
		)

	// Se for muito pequeno por algum motivo o header diminui o tamanho, deve reajustar o estilo top
	readonly topGap$ = this.breakpointObserver.observe([Breakpoints.XSmall])
		.pipe(
			takeUntil(this.destroy$),
			map((val) => val.matches ? 56 : 64),
		)

	private readonly openedSub$ = new BehaviorSubject(true)
	readonly opened$ = this.openedSub$.asObservable().pipe(tap((val) => this.navService.emitSideNavOpen(val)))

	readonly navItems: INavItem[] = [{
		displayName: this.textProvider.sideNav.patients,
		iconName: 'person',
		route: './pacientes',
	}, {
		displayName: this.textProvider.sideNav.clinical,
		iconName: 'home_health',
		children: [{
			displayName: this.textProvider.sideNav.payments,
			iconName: 'payment',
			route: './clinico/pagamentos',
		}],
	}, {
		displayName: this.textProvider.sideNav.configs,
		iconName: 'settings',
		route: './configuracao',
	}]

	constructor(private navService: NavService, private clinicService: ClinicService, private breakpointObserver: BreakpointObserver, private router: Router) {
		super()
		this.clinic = clinicService.currentClinic

		navService.sidenavToggle$.pipe(takeUntil(this.destroy$)).subscribe(() => {
			this.toggle()
		})

		// Se a rota for selecionada, fecha se for do modo 'over'
		router.events.pipe(
			takeUntil(this.destroy$),
			filter((val) => val instanceof NavigationEnd || val instanceof NavigationSkipped),
		).subscribe(() => {
			if(this.sideNav?.mode === 'over') {
				this.close()
			}
		})

		this.destroy$.subscribe(() => {
			this.navService.showSidenavToggle(false)
		})
	}

	ngOnInit() {
		this.navService.showSidenavToggle(true)
		this.open()
	}

	private open() {
		this.openedSub$.next(true)
	}

	public close() {
		this.openedSub$.next(false)
	}

	private toggle() {
		this.openedSub$.next(!this.openedSub$.value)
	}
}
