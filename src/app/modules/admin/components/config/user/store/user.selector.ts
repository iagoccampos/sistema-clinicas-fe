import { createFeatureSelector, createSelector } from '@ngrx/store'
import { INewOrUpdateUserState } from './user.reducer'

export const selectConfig = createFeatureSelector<INewOrUpdateUserState>('user')

export const selectGetUsersStatus = createSelector(
	selectConfig,
	(user) => user.getUsersStatus,
)

export const selectUsers = createSelector(
	selectConfig,
	(user) => user.users,
)

export const selectAddOrUpdateUserStatus = createSelector(
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
