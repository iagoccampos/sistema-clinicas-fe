import { ComponentFixture, TestBed } from '@angular/core/testing'
import { InputComponent } from './input.component'
import { SharedModule } from '../../shared.module'
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms'
import { TESTING_MODULES } from 'src/app/test/testing-module-mocs'

describe('InputComponent', () => {
	let fixture: ComponentFixture<InputComponent>
	let component: InputComponent

	const formGroup: FormGroup = new FormGroup({
		'test': new FormControl('', [Validators.maxLength(100)]),
	})

	const formGroupDirective: FormGroupDirective = new FormGroupDirective([], [])
	formGroupDirective.form = formGroup

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [SharedModule, ...TESTING_MODULES],
			declarations: [InputComponent],
			providers: [{
				provide: ControlContainer,
				useValue: formGroupDirective,
			}],
		})

		fixture = TestBed.createComponent(InputComponent)
		fixture.componentRef.setInput('controlName', 'test')
		fixture.detectChanges()

		component = fixture.componentInstance
	})

	it('should create the component', () => {
		expect(component).toBeTruthy()
	})

	it('should toggle the pass', () => {
		const value = component._hidePass
		component.togglePass()
		expect(component._hidePass).toBe(!value)
	})

	it('should have a max value of 100', () => {
		component.ngOnInit()
		expect(component._maxLength).toBe(100)
	})

	it('should set options as key/value pair if it recieves as string or object', () => {
		component.options = [{ label: 'a', value: 'a' }, 'b']
		expect(component._options).toEqual([{ label: 'a', value: 'a' }, { label: 'b', value: 'b' }])
	})
})
