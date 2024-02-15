import { DestroyRef, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormGroup } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { MemoizedSelector, Store } from '@ngrx/store'
import { map, tap } from 'rxjs'
import { FormStatus } from 'src/app/models/form-status.model'

export function createModalLoadingManager(selector: MemoizedSelector<object, FormStatus>, formGroup: FormGroup, dialogRef?: MatDialogRef<any>) {
	const store = inject(Store)
	const destroyRef = inject(DestroyRef)

	return store.select(selector).pipe(
		takeUntilDestroyed(destroyRef),
		tap((val) => {
			if(dialogRef) {
				dialogRef.disableClose = val === 'loading'

				if(val === 'success') {
					dialogRef.close()
				}
			} else {
				if(val === 'success') {
					formGroup.enable()
				}
			}

			if(val === 'loading') {
				formGroup.disable()
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
