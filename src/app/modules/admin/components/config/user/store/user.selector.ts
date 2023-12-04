import { createFeatureSelector, createSelector } from '@ngrx/store'
import { INewEditUserState } from './user.reducer'

export const selectConfig = createFeatureSelector<INewEditUserState>('user')

export const selectGetUsersStatus = createSelector(
	selectConfig,
	(user) => user.getUsersStatus,
)

export const selectUsers = createSelector(
	selectConfig,
	(user) => user.users,
)

export const selectAddEditUserStatus = createSelector(
	selectConfig,
	(user) => user.addUpdateUserStatus,
)

export const selectUpdateUserPassStatus = createSelector(
	selectConfig,
	(user) => user.updateUserPassStatus,
)

export const selectDeleteUserStatus = createSelector(
	selectConfig,
	(user) => user.deleteUserStatus,
)
