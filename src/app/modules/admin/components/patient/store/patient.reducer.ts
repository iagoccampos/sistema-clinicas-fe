import { createReducer, on } from '@ngrx/store'
import { FormStatus } from 'src/app/models/form-status.model'
import { IFindPatient, INewPatient, IPatientsResponse } from 'src/app/models/patient.model'
import { createPatientError, createPatient, createPatientSuccess, editPatient, editPatientError, editPatientSuccess, findPatients, findPatientsSuccess, findPatientsError, openCreateOrEditDialog, openDeleteDialog, deletePatient, deletePatientError, deletePatientSuccess } from './patient.actions'

export interface PatientState {
	editOrCreateForm: INewPatient | null
	findForm: IFindPatient | null
	editOrCreateStatus: FormStatus
	findStatus: FormStatus
	deleteStatus: FormStatus
	patients: IPatientsResponse | null
	errorMsg: string | null
}

const initialState: PatientState = {
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
	on(openCreateOrEditDialog, (state): PatientState => {
		return { ...state, editOrCreateStatus: 'pending' }
	}),
	on(openDeleteDialog, (state): PatientState => {
		return { ...state, deleteStatus: 'pending' }
	}),
	on(createPatient, editPatient, (state, action): PatientState => {
		return { ...state, editOrCreateStatus: 'loading', editOrCreateForm: action.patient }
	}),
	on(createPatientError, editPatientError, (state, action): PatientState => {
		return { ...state, editOrCreateStatus: 'error', errorMsg: action.error.errorMsg }
	}),
	on(createPatientSuccess, editPatientSuccess, (state): PatientState => {
		return { ...state, editOrCreateStatus: 'success' }
	}),
	on(findPatients, (state, action): PatientState => {
		return { ...state, findStatus: 'loading', findForm: action.search, patients: null }
	}),
	on(findPatientsSuccess, (state, action): PatientState => {
		return { ...state, findStatus: 'success', patients: action.patients }
	}),
	on(findPatientsError, (state): PatientState => {
		return { ...state, findStatus: 'error' }
	}),
	on(deletePatient, (state): PatientState => {
		return { ...state, deleteStatus: 'loading' }
	}),
	on(deletePatientError, (state): PatientState => {
		return { ...state, deleteStatus: 'error' }
	}),
	on(deletePatientSuccess, (state): PatientState => {
		return { ...state, deleteStatus: 'success' }
	}),
)
