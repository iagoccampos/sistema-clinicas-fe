import { createReducer, on } from '@ngrx/store'
import { FormStatus } from 'src/app/models/form-status.model'
import { addUser, addUserError, addUserSuccess, deleteUser, deleteUserError, deleteUserSuccess, editUser, editUserError, editUserSuccess, getUsers, getUsersError, getUsersSuccess, openDeleteUserDialog, openUpdateUserPassDialog, openUserDialog, updateUserPass, updateUserPassError, updateUserPassSuccess } from './user.actions'
import { IUser } from 'src/app/models/user.model'

export interface INewEditUserState {
	getUsersStatus: FormStatus
	addUpdateUserStatus: FormStatus
	updateUserPassStatus: FormStatus
	deleteUserStatus: FormStatus
	users: IUser[]
}

const initialState: INewEditUserState = {
	getUsersStatus: 'pending',
	addUpdateUserStatus: 'pending',
	updateUserPassStatus: 'pending',
	deleteUserStatus: 'pending',
	users: [],
}

export const userReducer = createReducer<INewEditUserState>(
	initialState,
	// Get
	on(getUsers, (state): INewEditUserState => {
		return { ...state, getUsersStatus: 'loading' }
	}),
	on(getUsersError, (state): INewEditUserState => {
		return { ...state, getUsersStatus: 'error' }
	}),
	on(getUsersSuccess, (state, action): INewEditUserState => {
		return { ...state, getUsersStatus: 'success', users: action.users }
	}),
	// Add
	on(openUserDialog, (state): INewEditUserState => {
		return { ...state, addUpdateUserStatus: 'pending' }
	}),
	on(addUser, (state): INewEditUserState => {
		return { ...state, addUpdateUserStatus: 'loading' }
	}),
	on(addUserError, (state): INewEditUserState => {
		return { ...state, addUpdateUserStatus: 'error' }
	}),
	on(addUserSuccess, (state): INewEditUserState => {
		return { ...state, addUpdateUserStatus: 'success' }
	}),
	// Update
	on(openUserDialog, (state): INewEditUserState => {
		return { ...state, addUpdateUserStatus: 'pending' }
	}),
	on(editUser, (state): INewEditUserState => {
		return { ...state, addUpdateUserStatus: 'loading' }
	}),
	on(editUserError, (state): INewEditUserState => {
		return { ...state, addUpdateUserStatus: 'error' }
	}),
	on(editUserSuccess, (state): INewEditUserState => {
		return { ...state, addUpdateUserStatus: 'success' }
	}),
	// Update Password
	on(openUpdateUserPassDialog, (state): INewEditUserState => {
		return { ...state, updateUserPassStatus: 'pending' }
	}),
	on(updateUserPass, (state): INewEditUserState => {
		return { ...state, updateUserPassStatus: 'loading' }
	}),
	on(updateUserPassError, (state): INewEditUserState => {
		return { ...state, updateUserPassStatus: 'error' }
	}),
	on(updateUserPassSuccess, (state): INewEditUserState => {
		return { ...state, updateUserPassStatus: 'success' }
	}),
	// Delete
	on(openDeleteUserDialog, (state): INewEditUserState => {
		return { ...state, deleteUserStatus: 'pending' }
	}),
	on(deleteUser, (state): INewEditUserState => {
		return { ...state, deleteUserStatus: 'loading' }
	}),
	on(deleteUserError, (state): INewEditUserState => {
		return { ...state, deleteUserStatus: 'error' }
	}),
	on(deleteUserSuccess, (state): INewEditUserState => {
		return { ...state, deleteUserStatus: 'success' }
	}),
)
