import { DestroyRef, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatPaginator } from '@angular/material/paginator'
import { MemoizedSelector, Store } from '@ngrx/store'
import { tap, map } from 'rxjs'
import { PaginationResponse } from 'src/app/models/pagination.model'
import { selectPatients } from 'src/app/modules/admin/components/patient/store/patient.selector'

export function createTableManager(selector: MemoizedSelector<object, PaginationResponse<any>>, paginator?: MatPaginator) {
	const store = inject(Store)
	const destroyRef = inject(DestroyRef)

	return store.select(selectPatients).pipe(
		takeUntilDestroyed(destroyRef),
		tap((val) => {
			if(paginator) {
				paginator.length = val.total
			}
		}),
		map((val) => {
			return val.items || []
		}),
	)
}
