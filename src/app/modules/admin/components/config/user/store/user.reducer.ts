import { createReducer, on } from '@ngrx/store'
import { FormStatus } from 'src/app/models/form-status.model'
import { addUser, addUserError, addUserSuccess, deleteUser, deleteUserError, deleteUserSuccess, updateUser, updateUserError, updateUserSuccess, getUsers, getUsersError, getUsersSuccess, openDeleteUserDialog, openUpdateUserPassDialog, openUserDialog, updateUserPass, updateUserPassError, updateUserPassSuccess } from './user.actions'
import { IUser } from 'src/app/models/user.model'

export interface INewOrUpdateUserState {
	getUsersStatus: FormStatus
	addUpdateUserStatus: FormStatus
	updateUserPassStatus: FormStatus
	deleteUserStatus: FormStatus
	users: IUser[]
}

const initialState: INewOrUpdateUserState = {
	getUsersStatus: 'pending',
	addUpdateUserStatus: 'pending',
	updateUserPassStatus: 'pending',
	deleteUserStatus: 'pending',
	users: [],
}

export const userReducer = createReducer<INewOrUpdateUserState>(
	initialState,
	// Get
	on(getUsers, (state): INewOrUpdateUserState => {
		return { ...state, getUsersStatus: 'loading' }
	}),
	on(getUsersError, (state): INewOrUpdateUserState => {
		return { ...state, getUsersStatus: 'error' }
	}),
	on(getUsersSuccess, (state, action): INewOrUpdateUserState => {
		return { ...state, getUsersStatus: 'success', users: action.users }
	}),
	// Add
	on(openUserDialog, (state): INewOrUpdateUserState => {
		return { ...state, addUpdateUserStatus: 'pending' }
	}),
	on(addUser, (state): INewOrUpdateUserState => {
		return { ...state, addUpdateUserStatus: 'loading' }
	}),
	on(addUserError, (state): INewOrUpdateUserState => {
		return { ...state, addUpdateUserStatus: 'error' }
	}),
	on(addUserSuccess, (state): INewOrUpdateUserState => {
		return { ...state, addUpdateUserStatus: 'success' }
	}),
	// Update
	on(openUserDialog, (state): INewOrUpdateUserState => {
		return { ...state, addUpdateUserStatus: 'pending' }
	}),
	on(updateUser, (state): INewOrUpdateUserState => {
		return { ...state, addUpdateUserStatus: 'loading' }
	}),
	on(updateUserError, (state): INewOrUpdateUserState => {
		return { ...state, addUpdateUserStatus: 'error' }
	}),
	on(updateUserSuccess, (state): INewOrUpdateUserState => {
		return { ...state, addUpdateUserStatus: 'success' }
	}),
	// Update Password
	on(openUpdateUserPassDialog, (state): INewOrUpdateUserState => {
		return { ...state, updateUserPassStatus: 'pending' }
	}),
	on(updateUserPass, (state): INewOrUpdateUserState => {
		return { ...state, updateUserPassStatus: 'loading' }
	}),
	on(updateUserPassError, (state): INewOrUpdateUserState => {
		return { ...state, updateUserPassStatus: 'error' }
	}),
	on(updateUserPassSuccess, (state): INewOrUpdateUserState => {
		return { ...state, updateUserPassStatus: 'success' }
	}),
	// Delete
	on(openDeleteUserDialog, (state): INewOrUpdateUserState => {
		return { ...state, deleteUserStatus: 'pending' }
	}),
	on(deleteUser, (state): INewOrUpdateUserState => {
		return { ...state, deleteUserStatus: 'loading' }
	}),
	on(deleteUserError, (state): INewOrUpdateUserState => {
		return { ...state, deleteUserStatus: 'error' }
	}),
	on(deleteUserSuccess, (state): INewOrUpdateUserState => {
		return { ...state, deleteUserStatus: 'success' }
	}),
)
