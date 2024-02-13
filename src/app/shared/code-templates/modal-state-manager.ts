import { FormGroup } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { MemoizedSelector, Store } from '@ngrx/store'
import { map, tap } from 'rxjs'
import { FormStatus } from 'src/app/models/form-status.model'

export function createModalLoadingManager(store: Store, selector: MemoizedSelector<object, FormStatus>, formGroup: FormGroup, dialogRef: MatDialogRef<any>) {
	return store.select(selector).pipe(
		tap((val) => {
			dialogRef.disableClose = val === 'loading'

			if(val === 'loading') {
				formGroup.disable()
			}

			if(val === 'success') {
				dialogRef.close()
			}

			if(val === 'error') {
				formGroup.enable()
			}
		}),
		map((val) => {
			return val === 'loading'
		}),
	)
}
