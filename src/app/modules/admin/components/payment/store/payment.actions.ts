import { createAction, props } from '@ngrx/store'
import { IActionError } from 'src/app/models/action-error.model'
import { PaginationResponse } from 'src/app/models/pagination.model'
import { IPatient } from 'src/app/models/patient.model'
import { INewOrUpdatePayment, IPayment, IPaymentQuery } from 'src/app/models/payment.model'

export const openPaymentDialog = createAction(
	'[Payment] OpenDialog',
	props<{ patient?: IPatient, payment?: IPayment }>(),
)

export const createPayment = createAction(
	'[Payment] Create',
	props<{ payment: INewOrUpdatePayment }>(),
)

export const createPaymentSuccess = createAction(
	'[Payment] CreateSuccess',
	props<{ payment: IPayment }>(),
)

export const createPaymentError = createAction(
	'[Payment] CreateError',
	props<{ error: IActionError }>(),
)

export const findPayments = createAction(
	'[Payment] Find',
	props<{ query?: IPaymentQuery }>(),
)

export const findPaymentsSuccess = createAction(
	'[Payment] FindSuccess',
	props<{ payments: PaginationResponse<IPayment> }>(),
)

export const findPaymentsError = createAction(
	'[Payment] FindError',
	props<{ error: IActionError }>(),
)

export const updatePayment = createAction(
	'[Payment] Update',
	props<{ id: string, payment: INewOrUpdatePayment }>(),
)

export const updatePaymentSuccess = createAction(
	'[Payment] UpdateSuccess',
	props<{ payment: IPayment }>(),
)

export const updatePaymentError = createAction(
	'[Payment] UpdateError',
	props<{ error: IActionError }>(),
)

export const deletePayment = createAction(
	'[Payment] Delete',
	props<{ id: string }>(),
)

export const deletePaymentSuccess = createAction(
	'[Payment] DeleteSuccess',
	props<{ payment: IPayment }>(),
)

export const deletePaymentError = createAction(
	'[Payment] DeleteError',
	props<{ error: IActionError }>(),
)

export const openDeletePaymentDialog = createAction(
	'[Payment] OpenDeleteDialog',
	props<{ payment: IPayment }>(),
)
