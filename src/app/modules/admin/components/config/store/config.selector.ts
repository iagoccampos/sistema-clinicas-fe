import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IConfigState } from './config.reducer'

export const selectConfig = createFeatureSelector<IConfigState>('config')

export const selectDeleteClinicStatus = createSelector(
	selectConfig,
	(config) => config.deleteClinicStatus,
)
