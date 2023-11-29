import { createReducer, on } from '@ngrx/store'
import { IClinic, NewOrUpdateClinic } from 'src/app/models/clinic.model'
import { FormStatus } from 'src/app/models/form-status.model'
import { createClinic, createClinicError, createClinicSuccess } from './new-clinic.actions'

export interface INewClinicState {
	form: NewOrUpdateClinic | null
	clinic: IClinic | null
	status: FormStatus
	errorMsg: string | null
}

const initialState: INewClinicState = {
	form: null,
	clinic: null,
	status: 'pending',
	errorMsg: null,
} as const

export const newClinicReducer = createReducer<INewClinicState>(
	initialState,
	on(createClinic, (state, action): INewClinicState => {
		return { ...state, status: 'loading', form: action.clinicForm }
	}),
	on(createClinicError, (state): INewClinicState => {
		return { ...state, status: 'error' }
	}),
	on(createClinicSuccess, (state): INewClinicState => {
		return { ...state, status: 'success' }
	}),
)
