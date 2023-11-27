import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Router } from '@angular/router'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { deleteClinic, deleteClinicError, deleteClinicSuccess, openDeleteClinicDialog } from './config.actions'
import { selectDeleteClinicStatus } from './config.selector'
import { ClinicService } from 'src/app/services/clinic.service'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { DialogService } from 'src/app/services/dialog.service'

@Injectable()
export class ConfigEffects {
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
					entityName: 'clínica',
					entityValue: val.clinic.name,
					irreversible: true,
				})
			}),
		)
	}, { dispatch: false })

	private deleteClinicError = createEffect(() => {
		return this.actions$.pipe(
			ofType(deleteClinicError),
			tap((val) => {
				this.snackbarService.error(`Erro ao deletar a clínica: ${val.error.errorMsg}`)
			}),
		)
	}, { dispatch: false })

	private deleteClinicSuccess = createEffect(() => {
		return this.actions$.pipe(
			ofType(deleteClinicSuccess),
			tap(() => {
				this.snackbarService.success('Clínica removida com sucesso.')
				this.router.navigate(['admin', 'clinicas'])
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
