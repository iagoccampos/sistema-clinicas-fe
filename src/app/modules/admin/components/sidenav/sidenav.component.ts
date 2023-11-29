import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core'
import { NavService } from 'src/app/services/nav.service'
import { INavItem } from './nav-list-item/nav-list-item.component'
import { IClinic } from 'src/app/models/clinic.model'

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit, OnDestroy {
	@Input({ required: true }) clinic: IClinic | null = null

	navItems: INavItem[] = [{
		displayName: 'Visão geral',
		iconName: 'dashboard',
		route: './dashboard',
	}, {
		displayName: 'Pacientes',
		iconName: 'person',
		route: './pacientes',
	}, {
		displayName: 'Configurações',
		iconName: 'settings',
		route: './configuracao',
	}]

	constructor(public navService: NavService) { }

	ngOnInit() {
		this.navService.showSidenavToggle(true)
		this.navService.showSidenav()
	}

	ngOnDestroy() {
		this.navService.showSidenavToggle(false)
	}
}
