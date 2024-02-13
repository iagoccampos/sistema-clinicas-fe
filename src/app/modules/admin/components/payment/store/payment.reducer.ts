import { createReducer, on } from '@ngrx/store'
import { FormStatus } from 'src/app/models/form-status.model'
import { createPayment, createPaymentError, createPaymentSuccess, openDialog } from './payment.actions'

export interface IPaymentState {
	createPaymentStatus: FormStatus
}

const initialState: IPaymentState = {
	createPaymentStatus: 'pending',
}

export const paymentReducer = createReducer(initialState,
	on(openDialog, (state): IPaymentState => {
		return { ...state, createPaymentStatus: 'pending' }
	}),
	on(createPayment, (state): IPaymentState => {
		return { ...state, createPaymentStatus: 'loading' }
	}),
	on(createPaymentSuccess, (state): IPaymentState => {
		return { ...state, createPaymentStatus: 'success' }
	}),
	on(createPaymentError, (state): IPaymentState => {
		return { ...state, createPaymentStatus: 'error' }
	}),
)
