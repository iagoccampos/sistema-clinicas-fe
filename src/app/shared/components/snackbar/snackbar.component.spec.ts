import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SnackbarComponent } from './snackbar.component'
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar'
import { SharedModule } from '../../shared.module'

describe('SnackbarComponent', () => {
	let fixture: ComponentFixture<SnackbarComponent>
	let component: SnackbarComponent

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [SharedModule],
			declarations: [SnackbarComponent],
			providers: [MatSnackBar, { provide: MAT_SNACK_BAR_DATA, useValue: {
				type: 'success',
				msg: 'message',
			} }],
		})

		fixture = TestBed.createComponent(SnackbarComponent)
		component = fixture.componentInstance
	})

	it('should create the component', () => {
		expect(component).toBeTruthy()
	})

	it('should dismiss all snackbars on close', () => {
		spyOn(component['matSnackbar'], 'dismiss')
		component.close()
		expect(component['matSnackbar']['dismiss']).toHaveBeenCalled()
	})
})
