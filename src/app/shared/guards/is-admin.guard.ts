import { inject } from '@angular/core'
import { CanActivateFn } from '@angular/router'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'
import { logout } from 'src/app/components/auth/store/auth.actions'
import { selectCurrentUser } from 'src/app/components/auth/store/auth.selector'

export const isAdmin: CanActivateFn = () => {
	const store = inject(Store)

	return store.select(selectCurrentUser).pipe(
		map((val) => {
			if(val?.level === 'Admin') {
				return true
			}

			store.dispatch(logout())

			return false
		}),
	)
}
