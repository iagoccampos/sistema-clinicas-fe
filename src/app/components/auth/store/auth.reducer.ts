import { createReducer, on } from "@ngrx/store"
import { getTokenFromStore, login, loginError, loginSuccess, logout, toggleHidePass } from "./auth.actions"
import { FormStatus } from "src/app/models/form-status.model"
import { User } from "src/app/models/user.model"

export interface AuthState {
	currentUser: User | null
	token: string | null
	hidePass: boolean
	errorMsg: string | null
	status: FormStatus
}

const initialState: AuthState = {
	currentUser: null,
	token: null,
	hidePass: true,
	errorMsg: null,
	status: 'pending',
} as const

export const authReducer = createReducer<AuthState>(
	initialState,
	on(toggleHidePass, (state): AuthState => {
		return { ...state, hidePass: !state.hidePass }
	}),
	on(getTokenFromStore, (state): AuthState => {
		return { ...state }
	}),
	on(login, (state): AuthState => {
		return { ...state, status: 'loading', errorMsg: null }
	}),
	on(loginError, (state, action): AuthState => {
		return { ...state, status: 'error', errorMsg: action.error.errorMsg }
	}),
	on(loginSuccess, (state, action): AuthState => {
		return { ...state, status: 'success', currentUser: action.currentUser, token: action.token }
	}),
	on(logout, (state): AuthState => {
		return { ...state, status: 'pending', currentUser: null, token: null }
	}),
);
