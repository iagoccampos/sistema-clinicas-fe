import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { PatientService } from 'src/app/services/patient.service'
import { createPatientError, createPatient, createPatientSuccess, updatePatient, updatePatientSuccess, updatePatientError, findPatients, findPatientsSuccess, findPatientsError, openCreateOrUpdateDialog, deletePatient, openDeleteDialog, deletePatientSuccess, deletePatientError } from './patient.actions'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { DialogService } from 'src/app/services/dialog.service'
import { selectDeleteStatus } from './patient.selector'

@Injectable()
export class PatientEffects {
	private readonly openCreateOrUpdateDialog = createEffect(() => {
		return this.actions.pipe(
			ofType(openCreateOrUpdateDialog),
			tap((val) => {
				this.patientService.openPatientDialog(val.patient)
			}),
		)
	}, { dispatch: false })

	private readonly newPatient = createEffect(() => {
		return this.actions.pipe(
			ofType(createPatient),
			switchMap((val) => {
				return this.patientService.createPatient(val.patient).pipe(
					map((res) => {
						return createPatientSuccess({ patient: res })
					}),
					catchError((err) => {
						return of(createPatientError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private readonly updatePatient = createEffect(() => {
		return this.actions.pipe(
			ofType(updatePatient),
			switchMap((val) => {
				return this.patientService.updatePatient(val.id, val.patient).pipe(
					map((res) => {
						return updatePatientSuccess({ patient: res })
					}),
					catchError((err) => {
						return of(updatePatientError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private readonly findPatients = createEffect(() => {
		return this.actions.pipe(
			ofType(findPatients),
			switchMap((val) => {
				return this.patientService.getPatients(val.query).pipe(
					map((res) => {
						return findPatientsSuccess({ patients: res })
					}),
					catchError((err) => {
						return of(findPatientsError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private readonly openDeletePatientDialog = createEffect(() => {
		return this.actions.pipe(
			ofType(openDeleteDialog),
			tap((val) => {
				this.dialogService.openDeleteConfirmationDialog({
					dispatch: { action: deletePatient({ patientId: val.patient._id }), selector: selectDeleteStatus },
					entityName: $localize `paciente`,
					entityValue: val.patient.name,
				})
			}),
		)
	}, { dispatch: false })

	private readonly deletePatient = createEffect(() => {
		return this.actions.pipe(
			ofType(deletePatient),
			switchMap((val) => {
				return this.patientService.deletePatient(val.patientId).pipe(
					map(() => {
						return deletePatientSuccess()
					}),
					catchError((err) => {
						return of(deletePatientError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private readonly patientError = createEffect(() => {
		return this.actions.pipe(
			ofType(createPatientError, updatePatientError, findPatientsError, deletePatientError),
			tap((val) => {
				this.snackbarService.error(val.error.errorMsg)
			}),
		)
	}, { dispatch: false })

	private readonly patientSuccess = createEffect(() => {
		return this.actions.pipe(
			ofType(createPatientSuccess, updatePatientSuccess, deletePatientSuccess),
			tap((val) => {
				let message = ''

				switch (val.type) {
					case '[Patient] CreateSuccess':
						message = 'Paciente criado com sucesso.'
						break
					case '[Patient] UpdateSuccess':
						message = 'Paciente editado com sucesso.'
						break
					case '[Patient] DeleteSuccess':
						message = 'Paciente deletado com sucesso.'
						break
				}

				this.snackbarService.success(message)
			}),
		)
	}, { dispatch: false })

	constructor(
		private actions: Actions,
		private snackbarService: SnackbarService,
		private patientService: PatientService,
		private dialogService: DialogService) {}
}
