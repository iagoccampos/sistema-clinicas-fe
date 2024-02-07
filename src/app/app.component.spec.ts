import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { ThemeService } from './services/theme.service'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { THEME_SERVICE } from './test/service-mocks'
import { Store } from '@ngrx/store'
import { getTokenFromStore } from './components/auth/store/auth.actions'

describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>
	let component: AppComponent
	let themeService: ThemeService
	let store: Store

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AppComponent],
			providers: [THEME_SERVICE, provideMockStore()],
		})

		fixture = TestBed.createComponent(AppComponent)
		component = fixture.componentInstance
		themeService = TestBed.inject(ThemeService)
		store = TestBed.inject(MockStore)
	})

	it('should create the component', () => {
		expect(component).toBeTruthy()
	})

	it('should load theme', () => {
		component.ngOnInit()
		expect(themeService.load).toHaveBeenCalled()
	})

	it('should dispatch get token from store', () => {
		spyOn(store, 'dispatch')
		component.ngOnInit()
		expect(store.dispatch).toHaveBeenCalledWith(getTokenFromStore())
	})
})
