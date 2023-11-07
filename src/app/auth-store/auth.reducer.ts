import { createReducer, on } from "@ngrx/store"
import { User } from "../models/user.model"
import { getTokenFromStore, login, loginError, loginSuccess, logout, toggleHidePass } from "./auth.actions"

export type Status = 'pending' | 'loading' | 'error' | 'success'

export interface AuthState {
	currentUser: User | null
	token: string | null
	hidePass: boolean
	errorMsg: string | null
	status: Status
}

const initialState: AuthState = {
	currentUser: null,
	token: null,
	hidePass: true,
	errorMsg: null,
	status: 'pending',
}

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
		return { ...state, status: 'error', errorMsg: action.errorMsg }
	}),
	on(loginSuccess, (state, action): AuthState => {
		return { ...state, status: 'success', currentUser: action.currentUser, token: action.token }
	}),
	on(logout, (state): AuthState => {
		return { ...state, status: 'pending', currentUser: null, token: null }
	}),
);
