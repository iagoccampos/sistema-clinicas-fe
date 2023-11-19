import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IPatientState } from './patient.reducer'

export const selectPatient = createFeatureSelector<IPatientState>('patient')

export const selectEditOrCreateStatus = createSelector(
	selectPatient,
	(state) => state.editOrCreateStatus,
)

export const selectFindStatus = createSelector(
	selectPatient,
	(state) => state.findStatus,
)

export const selectDeleteStatus = createSelector(
	selectPatient,
	(state) => state.deleteStatus,
)

export const selectPatients = createSelector(
	selectPatient,
	(state) => state.patients,
)
