import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class NavService {
	private sidenavToggleSub$ = new Subject<void>()
	private showSidenavToggleSub$ = new BehaviorSubject(false)

	sidenavToggle$ = this.sidenavToggleSub$.asObservable()
	showSidenavToggle$ = this.showSidenavToggleSub$.asObservable()

	constructor() { }

	toggleSidenav() {
		this.sidenavToggleSub$.next()
	}

	showSidenavToggle(show: boolean) {
		this.showSidenavToggleSub$.next(show)
	}
}
