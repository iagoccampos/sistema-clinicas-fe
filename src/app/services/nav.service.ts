import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class NavService {
	private readonly sidenavToggleSub$ = new Subject<void>()
	private readonly sidenavOpenSub$ = new BehaviorSubject(true)
	private readonly showSidenavToggleSub$ = new BehaviorSubject(false)

	readonly sidenavToggle$ = this.sidenavToggleSub$.asObservable()
	readonly sidenavOpen$ = this.sidenavOpenSub$.asObservable()
	readonly showSidenavToggle$ = this.showSidenavToggleSub$.asObservable()

	constructor() { }

	toggleSidenav() {
		this.sidenavToggleSub$.next()
	}

	showSidenavToggle(show: boolean) {
		this.showSidenavToggleSub$.next(show)
	}

	emitSideNavOpen(open: boolean) {
		this.sidenavOpenSub$.next(open)
	}
}
