import { CanActivateFn } from '@angular/router'
import { inject } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Store } from '@ngrx/store'
import { logout } from 'src/app/components/auth/store/auth.actions'
import { map } from 'rxjs'
import { selectToken } from 'src/app/components/auth/store/auth.selector'

const helper = new JwtHelperService()

export const isAuth: CanActivateFn = () => {
	const store = inject(Store)

	return store.select(selectToken).pipe(
		map((token) => {
			if(!token || helper.isTokenExpired(token)) {
				store.dispatch(logout())
				return false
			}

			return true
		}),
	)
}
