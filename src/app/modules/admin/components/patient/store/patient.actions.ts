import { createAction, props } from '@ngrx/store'
import { IActionError } from 'src/app/models/action-error.model'
import { IEditPatient, IFindPatient, INewPatient, IPatient, IPatientsResponse } from 'src/app/models/patient.model'

export const openCreateOrEditDialog = createAction(
	'[Patient] OpenDialog',
	props<{ patient?: IPatient }>(),
)

export const createPatient = createAction(
	'[Patient] Create',
	props<{ patient: INewPatient }>(),
)

export const createPatientError = createAction(
	'[Patient] CreateError',
	props<{ error: IActionError }>(),
)

export const createPatientSuccess = createAction(
	'[Patient] CreateSuccess',
	props<{ patient: IPatient }>(),
)

export const editPatient = createAction(
	'[Patient] Edit',
	props<{ id: string, patient: IEditPatient }>(),
)

export const editPatientError = createAction(
	'[Patient] EditError',
	props<{ error: IActionError }>(),
)

export const editPatientSuccess = createAction(
	'[Patient] EditSuccess',
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