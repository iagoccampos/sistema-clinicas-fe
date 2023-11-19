import { createFeatureSelector, createSelector } from '@ngrx/store'
import { INewClinicState } from './new-clinic.reducer'

export const selectNewClinic = createFeatureSelector<INewClinicState>('newClinic')

export const selectStatus = createSelector(
	selectNewClinic,
	(newClinic) => newClinic.status,
)
