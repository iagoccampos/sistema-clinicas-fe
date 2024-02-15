import { createReducer, on } from '@ngrx/store'
import { FormStatus } from 'src/app/models/form-status.model'
import { IPatientResponse, IPatient } from 'src/app/models/patient.model'
import { createPatientError, createPatient, createPatientSuccess, updatePatient, updatePatientError, updatePatientSuccess, findPatients, findPatientsSuccess, findPatientsError, openCreateOrUpdateDialog, openDeleteDialog, deletePatient, deletePatientError, deletePatientSuccess } from './patient.actions'
import { PaginationResponse } from 'src/app/models/pagination.model'

export interface IPatientState {
	updateOrCreateStatus: FormStatus
	findStatus: FormStatus
	deleteStatus: FormStatus
	patients: IPatientResponse
}

const initialState: IPatientState = {
	updateOrCreateStatus: 'pending',
	findStatus: 'pending',
	deleteStatus: 'pending',
	patients: new PaginationResponse<IPatient>(),
}

export const patientReducer = createReducer(
	initialState,
	on(openCreateOrUpdateDialog, (state): IPatientState => {
		return { ...state, updateOrCreateStatus: 'pending' }
	}),
	on(openDeleteDialog, (state): IPatientState => {
		return { ...state, deleteStatus: 'pending' }
	}),
	on(createPatient, updatePatient, (state): IPatientState => {
		return { ...state, updateOrCreateStatus: 'loading' }
	}),
	on(createPatientError, updatePatientError, (state): IPatientState => {
		return { ...state, updateOrCreateStatus: 'error' }
	}),
	on(createPatientSuccess, updatePatientSuccess, (state): IPatientState => {
		return { ...state, updateOrCreateStatus: 'success' }
	}),
	on(findPatients, (state): IPatientState => {
		return { ...state, findStatus: 'loading' }
	}),
	on(findPatientsSuccess, (state, action): IPatientState => {
		return { ...state, findStatus: 'success', patients: action.patients }
	}),
	on(findPatientsError, (state): IPatientState => {
		return { ...state, findStatus: 'error' }
	}),
	on(deletePatient, (state): IPatientState => {
		return { ...state, deleteStatus: 'loading' }
	}),
	on(deletePatientError, (state): IPatientState => {
		return { ...state, deleteStatus: 'error' }
	}),
	on(deletePatientSuccess, (state): IPatientState => {
		return { ...state, deleteStatus: 'success' }
	}),
)
