import { createReducer, on } from '@ngrx/store'
import { FormStatus } from 'src/app/models/form-status.model'
import { IFindPatient, INewUpdatePatient, IPatientsResponse } from 'src/app/models/patient.model'
import { createPatientError, createPatient, createPatientSuccess, editPatient, editPatientError, editPatientSuccess, findPatients, findPatientsSuccess, findPatientsError, openCreateOrEditDialog, openDeleteDialog, deletePatient, deletePatientError, deletePatientSuccess } from './patient.actions'

export interface IPatientState {
	editOrCreateForm: INewUpdatePatient | null
	findForm: IFindPatient | null
	editOrCreateStatus: FormStatus
	findStatus: FormStatus
	deleteStatus: FormStatus
	patients: IPatientsResponse | null
	errorMsg: string | null
}

const initialState: IPatientState = {
	editOrCreateForm: null,
	findForm: null,
	editOrCreateStatus: 'pending',
	findStatus: 'pending',
	deleteStatus: 'pending',
	patients: null,
	errorMsg: null,
}

export const patientReducer = createReducer(
	initialState,
	on(openCreateOrEditDialog, (state): IPatientState => {
		return { ...state, editOrCreateStatus: 'pending' }
	}),
	on(openDeleteDialog, (state): IPatientState => {
		return { ...state, deleteStatus: 'pending' }
	}),
	on(createPatient, editPatient, (state, action): IPatientState => {
		return { ...state, editOrCreateStatus: 'loading', editOrCreateForm: action.patient }
	}),
	on(createPatientError, editPatientError, (state, action): IPatientState => {
		return { ...state, editOrCreateStatus: 'error', errorMsg: action.error.errorMsg }
	}),
	on(createPatientSuccess, editPatientSuccess, (state): IPatientState => {
		return { ...state, editOrCreateStatus: 'success' }
	}),
	on(findPatients, (state, action): IPatientState => {
		return { ...state, findStatus: 'loading', findForm: action.search, patients: null }
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
