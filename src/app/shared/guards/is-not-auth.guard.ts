import { CanActivateFn } from '@angular/router'
import { inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'
import { selectCurrentUser } from 'src/app/auth-store/auth.selector'
import { AuthService } from 'src/app/services/auth.service'

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
