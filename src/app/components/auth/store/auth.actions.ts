import { createAction, props } from '@ngrx/store'
import { IActionError } from 'src/app/models/action-error.model'
import { IUser } from 'src/app/models/user.model'

export const getTokenFromStore = createAction(
	'[Auth] GetToken',
)

export const login = createAction(
	'[Auth] Login',
	props<{ username: string, password: string }>(),
)

export const loginError = createAction(
	'[Auth] LoginError',
	props<{ error: IActionError}>(),
)

export const loginSuccess = createAction(
	'[Auth] LoginSuccess',
	props<{ currentUser: IUser, token: string }>(),
)

export const logout = createAction(
	'[Auth] Logout',
)
