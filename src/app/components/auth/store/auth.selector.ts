import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AuthState } from "./auth.reducer"

export const selectAuth = createFeatureSelector<AuthState>('auth')

export const selectHidePass = createSelector(
	selectAuth,
	(auth) => auth.hidePass,
)

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

export const selectErrorMsg = createSelector(
	selectAuth,
	(auth) => auth.errorMsg,
)
