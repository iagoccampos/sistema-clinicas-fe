import { createAction, props } from "@ngrx/store"
import { User } from "../models/user.model"

export const toggleHidePass = createAction(
	'[Auth] ToggleHidePass',
)

export const login = createAction(
	'[Auth] Login',
	props<{ username: string, password: string }>(),
)

export const loginError = createAction(
	'[Auth] LoginError',
	props<{ errorMsg: string }>(),
)

export const loginSuccess = createAction(
	'[Auth] LoginSuccess',
	props<{ currentUser: User, token: string }>(),
)

export const logout = createAction(
	'[Auth] Logout',
)
