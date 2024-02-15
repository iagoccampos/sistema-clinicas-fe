import { createReducer, on } from '@ngrx/store'
import { FormStatus } from 'src/app/models/form-status.model'
import { createPayment, createPaymentError, createPaymentSuccess, deletePayment, deletePaymentError, deletePaymentSuccess, findPayments, findPaymentsError, findPaymentsSuccess, openDeletePaymentDialog, openPaymentDialog, updatePayment, updatePaymentError, updatePaymentSuccess } from './payment.actions'
import { IPayment } from 'src/app/models/payment.model'
import { PaginationResponse } from 'src/app/models/pagination.model'

export interface IPaymentState {
	createOrUpdatePaymentStatus: FormStatus
	findPaymentsStatus: FormStatus
	deletePaymentsStatus: FormStatus
	payments: PaginationResponse<IPayment>
}

const initialState: IPaymentState = {
	createOrUpdatePaymentStatus: 'pending',
	findPaymentsStatus: 'pending',
	deletePaymentsStatus: 'pending',
	payments: { total: 0, items: [] },
}

export const paymentReducer = createReducer(initialState,
	on(openPaymentDialog, (state): IPaymentState => {
		return { ...state, createOrUpdatePaymentStatus: 'pending' }
	}),
	on(createPayment, (state): IPaymentState => {
		return { ...state, createOrUpdatePaymentStatus: 'loading' }
	}),
	on(createPaymentSuccess, (state): IPaymentState => {
		return { ...state, createOrUpdatePaymentStatus: 'success' }
	}),
	on(createPaymentError, (state): IPaymentState => {
		return { ...state, createOrUpdatePaymentStatus: 'error' }
	}),
	on(findPayments, (state): IPaymentState => {
		return { ...state, findPaymentsStatus: 'loading' }
	}),
	on(findPaymentsSuccess, (state, action): IPaymentState => {
		return { ...state, findPaymentsStatus: 'success', payments: action.payments }
	}),
	on(findPaymentsError, (state): IPaymentState => {
		return { ...state, findPaymentsStatus: 'error' }
	}),
	on(updatePayment, (state): IPaymentState => {
		return { ...state, createOrUpdatePaymentStatus: 'loading' }
	}),
	on(updatePaymentSuccess, (state): IPaymentState => {
		return { ...state, createOrUpdatePaymentStatus: 'success' }
	}),
	on(updatePaymentError, (state): IPaymentState => {
		return { ...state, createOrUpdatePaymentStatus: 'error' }
	}),
	on(openDeletePaymentDialog, (state): IPaymentState => {
		return { ...state, deletePaymentsStatus: 'pending' }
	}),
	on(deletePayment, (state): IPaymentState => {
		return { ...state, deletePaymentsStatus: 'loading' }
	}),
	on(deletePaymentSuccess, (state): IPaymentState => {
		return { ...state, deletePaymentsStatus: 'success' }
	}),
	on(deletePaymentError, (state): IPaymentState => {
		return { ...state, deletePaymentsStatus: 'error' }
	}),
)
