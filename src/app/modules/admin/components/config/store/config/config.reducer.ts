import { createReducer, on } from '@ngrx/store'
import { FormStatus } from 'src/app/models/form-status.model'
import { deleteClinic, deleteClinicError, deleteClinicSuccess, openDeleteClinicDialog, updateClinic, updateClinicError, updateClinicSuccess } from './config.actions'

export interface IConfigState {
	updateClinicStatus: FormStatus
	deleteClinicStatus: FormStatus
}

const initialState: IConfigState = {
	updateClinicStatus: 'pending',
	deleteClinicStatus: 'pending',
} as const

export const configReducer = createReducer<IConfigState>(
	initialState,
	// Update
	on(updateClinic, (state): IConfigState => {
		return { ...state, updateClinicStatus: 'loading' }
	}),
	on(updateClinicError, (state): IConfigState => {
		return { ...state, updateClinicStatus: 'error' }
	}),
	on(updateClinicSuccess, (state): IConfigState => {
		return { ...state, updateClinicStatus: 'success' }
	}),
	// Delete
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
