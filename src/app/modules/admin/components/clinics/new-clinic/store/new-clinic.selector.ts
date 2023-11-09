import { createFeatureSelector, createSelector } from "@ngrx/store"
import { NewClinicState } from "./new-clinic.reducer"

export const selectNewClinic = createFeatureSelector<NewClinicState>('newClinic')

export const selectStatus = createSelector(
	selectNewClinic,
	(newClinic) => newClinic.status,
)
