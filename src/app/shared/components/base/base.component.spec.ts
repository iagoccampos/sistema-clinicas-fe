import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BaseComponent } from './base.component'

describe('BaseComponent', () => {
	let fixture: ComponentFixture<BaseComponent>
	let component: BaseComponent

	beforeAll(() => {
		TestBed.configureTestingModule({
			declarations: [BaseComponent],
		})

		fixture = TestBed.createComponent(BaseComponent)
		component = fixture.componentInstance
	})

	it('should create the component', () => {
		expect(component).toBeTruthy()
	})

	it('should emmit destroy subject', () => {
		component['destroy$'].subscribe((val) => expect(val).toBeUndefined())
		component.ngOnDestroy()
	})
})
