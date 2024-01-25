import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Router } from '@angular/router'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { deleteClinic, deleteClinicError, deleteClinicSuccess, openDeleteClinicDialog, updateClinic, updateClinicError, updateClinicSuccess } from './config.actions'
import { selectDeleteClinicStatus } from './config.selector'
import { ClinicService } from 'src/app/services/clinic.service'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { DialogService } from 'src/app/services/dialog.service'

@Injectable()
export class ConfigEffects {

	private readonly updateClinic = createEffect(() => {
		return this.actions$.pipe(
			ofType(updateClinic),
			switchMap((val) => {
				return this.clinicService.updateClinic(val.clinic).pipe(
					map(() => {
						return updateClinicSuccess()
					}),
					catchError((err) => {
						return of(updateClinicError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private readonly deleteClinic = createEffect(() => {
		return this.actions$.pipe(
			ofType(deleteClinic),
			switchMap(() => {
				return this.clinicService.deleteClinic().pipe(
					map(() => {
						return deleteClinicSuccess()
					}),
					catchError((err) => {
						return of(deleteClinicError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private openDeleteClinicDialog = createEffect(() => {
		return this.actions$.pipe(
			ofType(openDeleteClinicDialog),
			tap((val) => {
				this.dialogService.openDeleteConfirmationDialog({
					dispatch: { action: deleteClinic(), selector: selectDeleteClinicStatus },
					entityName: $localize `clínica`,
					entityValue: val.clinic.name,
					irreversible: true,
				})
			}),
		)
	}, { dispatch: false })

	private clinicError = createEffect(() => {
		return this.actions$.pipe(
			ofType(updateClinicError, deleteClinicError),
			tap((val) => {
				this.snackbarService.error(val.error.errorMsg)
			}),
		)
	}, { dispatch: false })

	private clinicSuccess = createEffect(() => {
		return this.actions$.pipe(
			ofType(updateClinicSuccess, deleteClinicSuccess),
			tap((val) => {
				switch (val.type) {
					case '[Config] UpdateClinicSuccess':
						this.snackbarService.success('Clínica alterada com sucesso.')
						break
					case '[Config] DeleteClinicSuccess':
						this.snackbarService.success('Clínica removida com sucesso.')
						this.router.navigate(['admin', 'clinicas'])
						break
				}
			}),
		)
	}, { dispatch: false })

	constructor(
		private actions$: Actions,
		private clinicService: ClinicService,
		private snackbarService: SnackbarService,
		private dialogService: DialogService,
		private router: Router) {}
}
