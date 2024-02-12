import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageHeaderComponent } from './page-header.component'

describe('PageHeaderComponent', () => {
	let fixture: ComponentFixture<PageHeaderComponent>
	let component: PageHeaderComponent

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PageHeaderComponent],
		})

		fixture = TestBed.createComponent(PageHeaderComponent)

		component = fixture.componentInstance

		component.hideHr = true
		component.title = 'title'
	})

	it('should create the component', () => {
		expect(component).toBeTruthy()
	})
})
