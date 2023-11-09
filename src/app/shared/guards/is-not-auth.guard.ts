import { CanActivateFn } from '@angular/router'
import { inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'
import { selectCurrentUser } from 'src/app/components/auth/store/auth.selector'

export const isNotAuth: CanActivateFn = () => {
	const store = inject(Store)
	const authService = inject(AuthService)

	return store.select(selectCurrentUser).pipe(
		map((user) => {
			if(user) {
				authService.redirect(user)
				return false
			}

			return true
		}),
	)
}
