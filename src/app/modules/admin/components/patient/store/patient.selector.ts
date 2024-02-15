import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IPatientState } from './patient.reducer'

export const selectPatient = createFeatureSelector<IPatientState>('patient')

export const selectCreateOrUpdateStatus = createSelector(
	selectPatient,
	(state) => state.updateOrCreateStatus,
)

export const selectFindStatusIsLoading = createSelector(
	selectPatient,
	(state) => state.findStatus === 'loading',
)

export const selectDeleteStatus = createSelector(
	selectPatient,
	(state) => state.deleteStatus,
)

export const selectPatients = createSelector(
	selectPatient,
	(state) => state.patients,
)

export const selectShouldGetPatients = createSelector(
	selectCreateOrUpdateStatus,
	selectDeleteStatus,
	(state1, state2) => state1 === 'success' || state2 === 'success',
)
