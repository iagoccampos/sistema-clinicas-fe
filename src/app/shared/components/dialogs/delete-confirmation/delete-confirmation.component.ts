import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Action, MemoizedSelector, Store } from '@ngrx/store'
import { Observable, map, takeUntil, takeWhile } from 'rxjs'
import { FormStatus } from 'src/app/models/form-status.model'
import { BaseComponent } from '../../base/base.component'

export interface IDialogData {
	dispatch?: { action: Action, selector: MemoizedSelector<any, FormStatus> }
	entityName?: string
	entityValue?: string
	irreversible?: boolean
}

@Component({
	selector: 'app-delete-confirmation',
	templateUrl: './delete-confirmation.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmationComponent extends BaseComponent {
	loading$: Observable<boolean> | null = null

	constructor(
		private store: Store,
		private dialogRef: MatDialogRef<DeleteConfirmationComponent, boolean>,
		@Inject(MAT_DIALOG_DATA) public data: IDialogData) {
		super()

		if(this.data.dispatch) {
			this.loading$ = this.store.select(this.data.dispatch.selector).pipe(
				takeUntil(this.destroy$),
				takeWhile((val) => {
					if(val === 'error' || val === 'success') {
						dialogRef.close()
						return false
					}

					return true
				}),
				map((val) => {
					if(val === 'loading') {
						dialogRef.disableClose = true
						return true
					}

					return false
				}),
			)
		}
	}

	confirm() {
		if(this.data.dispatch?.action) {
			this.store.dispatch(this.data.dispatch.action)
			return
		}

		this.dialogRef.close(true)
	}
}
