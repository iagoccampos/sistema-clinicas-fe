import { createAction, props } from '@ngrx/store'
import { IActionError } from 'src/app/models/action-error.model'
import { INewUpdatePatient, IFindPatient, IPatient, IPatientsResponse } from 'src/app/models/patient.model'

export const openCreateOrUpdateDialog = createAction(
	'[Patient] OpenDialog',
	props<{ patient?: IPatient }>(),
)

export const createPatient = createAction(
	'[Patient] Create',
	props<{ patient: INewUpdatePatient }>(),
)

export const createPatientError = createAction(
	'[Patient] CreateError',
	props<{ error: IActionError }>(),
)

export const createPatientSuccess = createAction(
	'[Patient] CreateSuccess',
	props<{ patient: IPatient }>(),
)

export const updatePatient = createAction(
	'[Patient] Update',
	props<{ id: string, patient: INewUpdatePatient }>(),
)

export const updatePatientError = createAction(
	'[Patient] UpdateError',
	props<{ error: IActionError }>(),
)

export const updatePatientSuccess = createAction(
	'[Patient] UpdateSuccess',
	props<{ patient: IPatient }>(),
)

export const findPatients = createAction(
	'[Patient] Find',
	props<{ search: IFindPatient }>(),
)

export const findPatientsError = createAction(
	'[Patient] FindError',
	props<{ error: IActionError }>(),
)

export const findPatientsSuccess = createAction(
	'[Patient] FindSuccess',
	props<{ patients: IPatientsResponse }>(),
)

export const openDeleteDialog = createAction(
	'[Patient] OpenDeleteDialog',
	props<{ patient: IPatient }>(),
)

export const deletePatient = createAction(
	'[Patient] Delete',
	props<{ patientId: string }>(),
)

export const deletePatientError = createAction(
	'[Patient] DeleteError',
	props<{ error: IActionError }>(),
)

export const deletePatientSuccess = createAction(
	'[Patient] DeleteSuccess',
)
