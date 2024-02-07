import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DeleteConfirmationComponent } from './delete-confirmation.component'
import { provideMockStore } from '@ngrx/store/testing'
import { SharedModule } from 'src/app/shared/shared.module'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { deleteUser } from 'src/app/modules/admin/components/config/user/store/user.actions'
import { selectDeleteUserStatus } from 'src/app/modules/admin/components/config/user/store/user.selector'
import { Store } from '@ngrx/store'

describe('DeleteConfirmationComponent', () => {
	let fixture: ComponentFixture<DeleteConfirmationComponent>
	let component: DeleteConfirmationComponent
	let store: Store

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [SharedModule],
			declarations: [DeleteConfirmationComponent],
			providers: [
				provideMockStore(),
				{ provide: MatDialogRef, useValue: {} },
				{ provide: MAT_DIALOG_DATA, useValue: {
					dispatch: { action: deleteUser, selector: selectDeleteUserStatus },
					entityName: 'Name',
					entityValue: 'Value',
					irreversible: true,
				} },
			],
		})

		fixture = TestBed.createComponent(DeleteConfirmationComponent)
		component = fixture.componentInstance

		store = TestBed.inject(Store)
	})

	it('should create the component', () => {
		expect(component).toBeTruthy()
	})

	it('should dispach the action if it have one', () => {
		spyOn(store, 'dispatch')
		component.confirm()
		expect(store.dispatch).toHaveBeenCalledWith(deleteUser)
	})
})
