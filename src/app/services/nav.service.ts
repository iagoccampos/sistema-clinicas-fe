import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private sidenavOpenSub$ = new BehaviorSubject(true)
  private showSidenavToggleSub$ = new BehaviorSubject(false)

  sidenavOpen$ = this.sidenavOpenSub$.asObservable()
  showSidenavToggle$ = this.showSidenavToggleSub$.asObservable()

  constructor() { }

  toggleSidenav() {
    this.sidenavOpenSub$.next(!this.sidenavOpenSub$.getValue())
  }

  showSidenav() {
    this.sidenavOpenSub$.next(true)
  }

  showSidenavToggle(show: boolean) {
    this.showSidenavToggleSub$.next(show)
  }
}
