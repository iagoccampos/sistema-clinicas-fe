import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IPaymentState } from './payment.reducer'

export const selectPayment = createFeatureSelector<IPaymentState>('payment')

export const selectCreateOrUpdatePaymentStatus = createSelector(
	selectPayment,
	(state) => state.createOrUpdatePaymentStatus,
)

export const selectPayments = createSelector(
	selectPayment,
	(state) => state.payments,
)

export const selectFindPaymentsStatusIsLoading = createSelector(
	selectPayment,
	(state) => state.findPaymentsStatus === 'loading',
)

export const selectDeletePaymentStatus = createSelector(
	selectPayment,
	(state) => state.deletePaymentsStatus,
)

export const selectShouldGetPayments = createSelector(
	selectCreateOrUpdatePaymentStatus,
	selectDeletePaymentStatus,
	(state1, state2) => state1 === 'success' || state2 === 'success',
)
