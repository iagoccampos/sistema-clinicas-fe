import { createAction, props } from '@ngrx/store'
import { IActionError } from 'src/app/models/action-error.model'
import { INewPayment } from 'src/app/models/payment.model'

export const openDialog = createAction(
	'[Payment] OpenDialog',
)

export const createPayment = createAction(
	'[Payment] Create',
	props<{ payment: INewPayment }>(),
)

export const createPaymentSuccess = createAction(
	'[Payment] CreateSuccess',
	props<{ payment: INewPayment }>(),
)

export const createPaymentError = createAction(
	'[Payment] CreateError',
	props<{ error: IActionError }>(),
)
