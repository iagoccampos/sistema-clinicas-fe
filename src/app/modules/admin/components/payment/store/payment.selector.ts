import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IPaymentState } from './payment.reducer'

export const selectPayment = createFeatureSelector<IPaymentState>('payment')

export const selectCreateStatus = createSelector(
	selectPayment,
	(state) => state.createPaymentStatus,
)
