import { createAction, props } from "@ngrx/store"
import { ActionError } from "src/app/models/action-error.model"
import { User } from "src/app/models/user.model"

export const toggleHidePass = createAction(
	'[Auth] ToggleHidePass',
)

export const getTokenFromStore = createAction(
	'[Auth] GetToken',
)

export const login = createAction(
	'[Auth] Login',
	props<{ username: string, password: string }>(),
)

export const loginError = createAction(
	'[Auth] LoginError',
	props<{ error: ActionError}>(),
)

export const loginSuccess = createAction(
	'[Auth] LoginSuccess',
	props<{ currentUser: User, token: string }>(),
)

export const logout = createAction(
	'[Auth] Logout',
)
