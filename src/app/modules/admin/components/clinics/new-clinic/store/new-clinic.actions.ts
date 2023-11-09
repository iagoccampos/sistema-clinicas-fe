import { createAction, props } from "@ngrx/store"
import { ActionError } from "src/app/models/action-error.model"
import { Clinic, NewClinic } from "src/app/models/clinic.model"

export const createClinic = createAction(
	'[NewClinic] Create',
	props<{clinicForm: NewClinic}>(),
)

export const createClinicError = createAction(
	'[NewClinic] CreateError',
	props<{ error: ActionError}>(),
)

export const createClinicSuccess = createAction(
	'[NewClinic] CreateSuccess',
	props<{clinic: Clinic}>(),
)
