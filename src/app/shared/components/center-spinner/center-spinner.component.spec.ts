import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CenterSpinnerComponent } from './center-spinner.component'
import { SharedModule } from '../../shared.module'
import { Subject } from 'rxjs'

describe('CenterSpinnerComponent', () => {
	let fixture: ComponentFixture<CenterSpinnerComponent>
	let component: CenterSpinnerComponent

	const subject = new Subject<boolean>()
	const dummyElement = document.createElement('div')

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [SharedModule],
			declarations: [CenterSpinnerComponent],
		})

		fixture = TestBed.createComponent(CenterSpinnerComponent)

		fixture.componentRef.setInput('loading$', subject.asObservable())
		fixture.componentRef.setInput('hideTarget', dummyElement)

		component = fixture.componentInstance
	})

	it('should create the component', () => {
		expect(component).toBeTruthy()
	})

	it('should set the target to its original display when not loading', () => {
		component.ngOnInit()
		subject.subscribe(() => expect(component.hideTarget?.style.display).toBe(component['currentTargetDisplay']))
		subject.next(false)
	})

	it('should set the target to display none when its loading', () => {
		component.ngOnInit()
		subject.subscribe(() => expect(component.hideTarget?.style.display).toBe('none'))
		subject.next(true)
	})
})
