import { createAction, props } from '@ngrx/store'
import { IActionError } from 'src/app/models/action-error.model'
import { INewUser, IUpdateUser, IUser } from 'src/app/models/user.model'

export const getUsers = createAction(
	'[User] GetUsers',
)

export const getUsersError = createAction(
	'[User] GetUsersError',
	props<{ error: IActionError }>(),
)

export const getUsersSuccess = createAction(
	'[User] GetUsersSuccess',
	props<{ users: IUser[] }>(),
)

export const openUserDialog = createAction(
	'[User] OpenUserDialog',
	props<{ user?: IUser }>(),
)

// Add
export const addUser = createAction(
	'[User] AddUser',
	props<{ user: INewUser }>(),
)

export const addUserError = createAction(
	'[User] AddUserError',
	props<{ error: IActionError }>(),
)

export const addUserSuccess = createAction(
	'[User] AddUserSuccess',
)

// Update
export const editUser = createAction(
	'[User] EditUser',
	props<{ id: string, user: IUpdateUser }>(),
)

export const editUserError = createAction(
	'[User] EditUserError',
	props<{ error: IActionError }>(),
)

export const editUserSuccess = createAction(
	'[User] EditUserSuccess',
)

// Update Password
export const openUpdateUserPassDialog = createAction(
	'[User] OpenUpdateUserDialog',
	props<{ user: IUser }>(),
)

export const updateUserPass = createAction(
	'[User] UpdateUserPass',
	props<{ id: string, password: string }>(),
)

export const updateUserPassError = createAction(
	'[User] UpdateUserPassError',
	props<{ error: IActionError }>(),
)

export const updateUserPassSuccess = createAction(
	'[User] UpdateUserPassSuccess',
)

// Delete
export const openDeleteUserDialog = createAction(
	'[User] OpenDeleteUserDialog',
	props<{ user: IUser }>(),
)

export const deleteUser = createAction(
	'[User] DeleteUser',
	props<{ userId: string }>(),
)

export const deleteUserError = createAction(
	'[User] DeleteUserError',
	props<{ error: IActionError }>(),
)

export const deleteUserSuccess = createAction(
	'[User] DeleteUserSuccess',
)
