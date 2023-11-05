import { CanActivateFn } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { UserLevel } from 'src/app/models/user.model'

export const isAdmin: CanActivateFn = () => {
	const authService = inject(AuthService)

	if(authService.getUser()?.level === UserLevel.Admin) {
		return true
	}

	authService.logoutAndRedirect()
	return false
}
