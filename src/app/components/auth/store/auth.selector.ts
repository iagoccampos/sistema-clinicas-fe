import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IAuthState } from './auth.reducer'

export const selectAuth = createFeatureSelector<IAuthState>('auth')

export const selectCurrentUser = createSelector(
	selectAuth,
	(auth) => auth.currentUser,
)

export const selectToken = createSelector(
	selectAuth,
	(auth) => auth.token,
)

export const selectStatus = createSelector(
	selectAuth,
	(auth) => auth.status,
)
