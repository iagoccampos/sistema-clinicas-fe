import { createReducer, on } from '@ngrx/store'
import { FormStatus } from 'src/app/models/form-status.model'
import { IPatientQuery, INewUpdatePatient, IPatient } from 'src/app/models/patient.model'
import { createPatientError, createPatient, createPatientSuccess, updatePatient, updatePatientError, updatePatientSuccess, findPatients, findPatientsSuccess, findPatientsError, openCreateOrUpdateDialog, openDeleteDialog, deletePatient, deletePatientError, deletePatientSuccess } from './patient.actions'
import { PaginationResponse } from 'src/app/models/pagination.model'

export interface IPatientState {
	updateOrCreateForm: INewUpdatePatient | null
	findForm: IPatientQuery | null
	updateOrCreateStatus: FormStatus
	findStatus: FormStatus
	deleteStatus: FormStatus
	patients: PaginationResponse<IPatient>
	errorMsg: string | null
}

const initialState: IPatientState = {
	updateOrCreateForm: null,
	findForm: null,
	updateOrCreateStatus: 'pending',
	findStatus: 'pending',
	deleteStatus: 'pending',
	patients: new PaginationResponse<IPatient>(),
	errorMsg: null,
}

export const patientReducer = createReducer(
	initialState,
	on(openCreateOrUpdateDialog, (state): IPatientState => {
		return { ...state, updateOrCreateStatus: 'pending' }
	}),
	on(openDeleteDialog, (state): IPatientState => {
		return { ...state, deleteStatus: 'pending' }
	}),
	on(createPatient, updatePatient, (state, action): IPatientState => {
		return { ...state, updateOrCreateStatus: 'loading', updateOrCreateForm: action.patient }
	}),
	on(createPatientError, updatePatientError, (state, action): IPatientState => {
		return { ...state, updateOrCreateStatus: 'error', errorMsg: action.error.errorMsg }
	}),
	on(createPatientSuccess, updatePatientSuccess, (state): IPatientState => {
		return { ...state, updateOrCreateStatus: 'success' }
	}),
	on(findPatients, (state, action): IPatientState => {
		return { ...state, findStatus: 'loading', findForm: action.query }
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
