import { createAction, props } from '@ngrx/store'
import { IActionError } from 'src/app/models/action-error.model'
import { IClinic } from 'src/app/models/clinic.model'

export const openDeleteClinicDialog = createAction(
	'[Config] openDeleteClinicDialog',
	props<{ clinic: IClinic}>(),
)

export const deleteClinic = createAction(
	'[Config] DeleteClinic',
)

export const deleteClinicError = createAction(
	'[Config] DeleteClinicError',
	props<{ error: IActionError}>(),
)

export const deleteClinicSuccess = createAction(
	'[Config] DeleteClinicSuccess',
)
