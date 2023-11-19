import { createReducer, on } from "@ngrx/store"
import { Clinic, NewClinic } from "src/app/models/clinic.model"
import { FormStatus } from "src/app/models/form-status.model"
import { createClinic, createClinicError, createClinicSuccess } from "./new-clinic.actions"

export interface NewClinicState {
	form: NewClinic | null
	clinic: Clinic | null
	status: FormStatus
	errorMsg: string | null
}

const initialState: NewClinicState = {
	form: null,
	clinic: null,
	status: 'pending',
	errorMsg: null,
} as const

export const newClinicReducer = createReducer<NewClinicState>(
	initialState,
	on(createClinic, (state, action): NewClinicState => {
		return { ...state, status: 'loading', form: action.clinicForm }
	}),
	on(createClinicError, (state): NewClinicState => {
		return { ...state, status: 'error' }
	}),
	on(createClinicSuccess, (state): NewClinicState => {
		return { ...state, status: 'success' }
	}),
)
