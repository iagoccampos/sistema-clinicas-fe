import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, of, switchMap, tap } from "rxjs"
import { getTokenFromStore, login, loginError, loginSuccess, logout } from "./auth.actions"
import { AuthService } from "../services/auth.service"
import { SnackbarService } from "../services/snackbar.service"

@Injectable()
export class AuthEffects {
	private readonly getToken = createEffect(() => {
		return this.actions$.pipe(
			ofType(getTokenFromStore),
			map(() => {
				const authData = this.authService.loadTokenFromStorage()

				if(authData) {
					return loginSuccess(authData)
				}

				return loginError({ errorMsg: 'Faça a autenticação para acessar o sistema.' })
			}),
		)
	})

	private readonly login = createEffect(() => {
		return this.actions$.pipe(
			ofType(login),
			switchMap((val) => {
				return this.authService.loginAndRedirect(val).pipe(
					map((res) => {
						if(!res.user) {
							return loginError({ errorMsg: res.error || 'Usuário não encontrado.' })
						}

						return loginSuccess({ currentUser: res.user, token: res.token })
					}),
					catchError((err) => {
						return of(loginError({ errorMsg: err.error }))
					}),
				)
			}),
		)
	})

	private readonly logout = createEffect(() => {
		return this.actions$.pipe(
			ofType(logout),
			tap(() => {
				this.authService.logoutAndRedirect()
			}),
		)
	}, { dispatch: false })

	private readonly loginError = createEffect(() => {
		return this.actions$.pipe(
			ofType(loginError),
			tap((error) => {
				this.snackbarService.error(error.errorMsg)
			}),
		)
	}, { dispatch: false })

	constructor(private actions$: Actions, private authService: AuthService, private snackbarService: SnackbarService) {}
}
