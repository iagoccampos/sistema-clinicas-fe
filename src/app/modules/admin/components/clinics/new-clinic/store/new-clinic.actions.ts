import { createAction, props } from '@ngrx/store'
import { IActionError } from 'src/app/models/action-error.model'
import { IClinic, NewClinic } from 'src/app/models/clinic.model'

export const createClinic = createAction(
	'[NewClinic] Create',
	props<{clinicForm: NewClinic}>(),
)

export const createClinicError = createAction(
	'[NewClinic] CreateError',
	props<{ error: IActionError}>(),
)

export const createClinicSuccess = createAction(
	'[NewClinic] CreateSuccess',
	props<{clinic: IClinic}>(),
)
