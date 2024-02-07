import { createReducer, on } from '@ngrx/store'
import { getTokenFromStore, login, loginError, loginSuccess, logout } from './auth.actions'
import { FormStatus } from 'src/app/models/form-status.model'
import { IUser } from 'src/app/models/user.model'

export interface IAuthState {
	currentUser: IUser | null
	token: string | null
	errorMsg: string | null
	status: FormStatus
}

const initialState: IAuthState = {
	currentUser: null,
	token: null,
	errorMsg: null,
	status: 'pending',
} as const

export const authReducer = createReducer<IAuthState>(
	initialState,
	on(getTokenFromStore, (state): IAuthState => {
		return { ...state }
	}),
	on(login, (state): IAuthState => {
		return { ...state, status: 'loading', errorMsg: null }
	}),
	on(loginError, (state, action): IAuthState => {
		return { ...state, status: 'error', errorMsg: action.error.errorMsg }
	}),
	on(loginSuccess, (state, action): IAuthState => {
		return { ...state, status: 'success', currentUser: action.currentUser, token: action.token }
	}),
	on(logout, (state): IAuthState => {
		return { ...state, status: 'pending', currentUser: null, token: null }
	}),
)
