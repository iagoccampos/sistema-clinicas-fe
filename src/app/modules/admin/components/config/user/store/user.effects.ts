import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { switchMap, map, catchError, of, tap } from 'rxjs'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { DialogService } from 'src/app/services/dialog.service'
import { addUser, addUserError, addUserSuccess, deleteUser, deleteUserError, deleteUserSuccess, updateUser, updateUserError, updateUserSuccess, getUsers, getUsersError, getUsersSuccess, openDeleteUserDialog, openUpdateUserPassDialog, openUserDialog, updateUserPass, updateUserPassError, updateUserPassSuccess } from './user.actions'
import { UserService } from 'src/app/services/user.service'
import { selectDeleteUserStatus } from './user.selector'

@Injectable()
export class UserEffects {
	private readonly getUsers = createEffect(() => {
		return this.actions$.pipe(
			ofType(getUsers),
			switchMap(() => {
				return this.userService.getClinicUsers().pipe(
					map((res) => {
						return getUsersSuccess({ users: res })
					}),
					catchError((err) => {
						return of(addUserError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private readonly createUser = createEffect(() => {
		return this.actions$.pipe(
			ofType(addUser),
			switchMap((val) => {
				return this.userService.addRegularUser(val.user).pipe(
					map(() => {
						return addUserSuccess()
					}),
					catchError((err) => {
						return of(addUserError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private readonly updateUser = createEffect(() => {
		return this.actions$.pipe(
			ofType(updateUser),
			switchMap((val) => {
				return this.userService.updateUser(val.id, val.user).pipe(
					map(() => {
						return updateUserSuccess()
					}),
					catchError((err) => {
						return of(updateUserError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private readonly updateUserPass = createEffect(() => {
		return this.actions$.pipe(
			ofType(updateUserPass),
			switchMap((val) => {
				return this.userService.updateUserPass(val.id, val.password).pipe(
					map(() => {
						return updateUserPassSuccess()
					}),
					catchError((err) => {
						return of(updateUserPassError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private readonly openDeleteUserDialog = createEffect(() => {
		return this.actions$.pipe(
			ofType(openDeleteUserDialog),
			tap((val) => {
				this.dialogService.openDeleteConfirmationDialog({
					dispatch: { action: deleteUser({ userId: val.user._id }), selector: selectDeleteUserStatus },
					entityName: $localize `usuário`,
					entityValue: val.user.name,
					irreversible: true,
				})
			}),
		)
	}, { dispatch: false })

	private readonly deleteUser = createEffect(() => {
		return this.actions$.pipe(
			ofType(deleteUser),
			switchMap((val) => {
				return this.userService.deleteUser(val.userId).pipe(
					map(() => {
						return deleteUserSuccess()
					}),
					catchError((err) => {
						return of(deleteUserError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private readonly openCreateUpdateDialog = createEffect(() => {
		return this.actions$.pipe(
			ofType(openUserDialog),
			tap((val) => {
				this.userService.openUserDialog(val.user)
			}),
		)
	}, { dispatch: false })

	private readonly openUpdatePassDialog = createEffect(() => {
		return this.actions$.pipe(
			ofType(openUpdateUserPassDialog),
			tap((val) => {
				this.userService.openUserPassDialog(val.user)
			}),
		)
	}, { dispatch: false })

	private readonly userError = createEffect(() => {
		return this.actions$.pipe(
			ofType(getUsersError, addUserError, updateUserError, updateUserPassError, deleteUserError),
			tap((val) => {
				this.snackbarService.error(val.error.errorMsg)
			}),
		)
	}, { dispatch: false })

	private readonly userSuccess = createEffect(() => {
		return this.actions$.pipe(
			ofType(addUserSuccess, updateUserSuccess, updateUserPassSuccess, deleteUserSuccess),
			map((val) => {
				switch (val.type) {
					case '[User] UpdateUserSuccess':
						this.snackbarService.success('Usuário alterado com sucesso.')
						break
					case '[User] AddUserSuccess':
						this.snackbarService.success('Usuário adicionado com sucesso.')
						break
					case '[User] UpdateUserPassSuccess':
						this.snackbarService.success('Senha alterada com sucesso.')
						break
					case '[User] DeleteUserSuccess':
						this.snackbarService.success('Usuário removido com sucesso.')
						break
				}

				return getUsers()
			}),
		)
	})

	constructor(
		private actions$: Actions,
		private userService: UserService,
		private snackbarService: SnackbarService,
		private dialogService: DialogService) {}
}
