import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AuthComponent } from './auth.component'
import { provideMockStore } from '@ngrx/store/testing'
import { Store } from '@ngrx/store'
import { login } from './store/auth.actions'
import { SharedModule } from 'src/app/shared/shared.module'

describe('AuthComponent', () => {
	let fixture: ComponentFixture<AuthComponent>
	let component: AuthComponent
	let store: Store

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [SharedModule],
			declarations: [AuthComponent],
			providers: [provideMockStore()],
		})

		fixture = TestBed.createComponent(AuthComponent)
		component = fixture.componentInstance
		store = TestBed.inject(Store)
	})

	it('should create the component', () => {
		expect(component).toBeTruthy()
	})

	it('should dispatch login', () => {
		spyOn(store, 'dispatch')
		component.login()
		expect(store.dispatch).toHaveBeenCalledWith(login(component.loginForm.getRawValue()))
	})
})
