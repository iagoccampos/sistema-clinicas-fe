import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '../../services/auth.service'

export const isAuth: CanActivateFn = () => {
	if(inject(AuthService).isLoggedIn()) {
		return true
	}

	inject(Router).navigate(['login'])
	return false
}
