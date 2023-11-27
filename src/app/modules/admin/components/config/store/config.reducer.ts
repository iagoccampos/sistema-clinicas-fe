import { createReducer, on } from '@ngrx/store'
import { FormStatus } from 'src/app/models/form-status.model'
import { deleteClinic, deleteClinicError, deleteClinicSuccess, openDeleteClinicDialog } from './config.actions'

export interface IConfigState {
	deleteClinicStatus: FormStatus
}

const initialState: IConfigState = {
	deleteClinicStatus: 'pending',
} as const

export const configReducer = createReducer<IConfigState>(
	initialState,
	on(openDeleteClinicDialog, (state): IConfigState => {
		return { ...state, deleteClinicStatus: 'pending' }
	}),
	on(deleteClinic, (state): IConfigState => {
		return { ...state, deleteClinicStatus: 'loading' }
	}),
	on(deleteClinicError, (state): IConfigState => {
		return { ...state, deleteClinicStatus: 'error' }
	}),
	on(deleteClinicSuccess, (state): IConfigState => {
		return { ...state, deleteClinicStatus: 'success' }
	}),
)
