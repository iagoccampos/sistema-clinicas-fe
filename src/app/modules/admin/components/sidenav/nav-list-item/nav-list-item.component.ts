import { trigger, state, style, transition, animate } from '@angular/animations'
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject, merge } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'

export interface INavItem {
	displayName: string
	disabled?: boolean
	iconName: string
	route?: string
	children?: INavItem[]
}

@Component({
	selector: 'app-nav-list-item',
	templateUrl: './nav-list-item.component.html',
	styleUrls: ['./nav-list-item.component.scss'],
	animations: [
		trigger('indicatorRotate', [
			state('collapsed', style({ transform: 'rotate(0deg)' })),
			state('expanded', style({ transform: 'rotate(180deg)' })),
			transition('expanded <=> collapsed',
				animate('225ms cubic-bezier(0.4,0.0,0.2,1)'),
			),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavListItemComponent implements OnInit {
	@Input() item: INavItem = { displayName: '', iconName: '' }
	@Input() depth = 0
	@Output() expand = new EventEmitter<void>(true)

	expanded$ = new BehaviorSubject(false)
	expandedObs$ = merge(
		this.router.events.pipe(filter((data): data is NavigationEnd => data instanceof NavigationEnd)),
		this.expanded$).pipe(
		map((data) => {
			if(typeof data === 'boolean') {
				return data
			}

			return this.evaluateRoute(data.urlAfterRedirects)
		}), tap((val) => {
			if(val) {
				this.expand.next()
			}
		}),
	)

	constructor(public router: Router) { }

	ngOnInit() {
		if(this.evaluateRoute(this.router.url)) {
			this.expanded$.next(true)
		}
	}

	onItemSelected(item: INavItem) {
		if(item.children?.length) {
			this.expanded$.next(!this.expanded$.getValue())
		}
	}

	onChildExpand() {
		this.expanded$.next(true)
	}

	private evaluateRoute(url: string) {
		if(this.item.route) {
			let route = this.item.route

			if(route.startsWith('.')) {
				route = route.slice(1)
			}

			return url.indexOf(route) > -1
		}

		return false
	}
}
