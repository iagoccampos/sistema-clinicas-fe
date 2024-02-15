import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { createPayment, createPaymentError, createPaymentSuccess, deletePayment, deletePaymentError, deletePaymentSuccess, findPayments, findPaymentsError, findPaymentsSuccess, openDeletePaymentDialog, openPaymentDialog, updatePayment, updatePaymentError, updatePaymentSuccess } from './payment.actions'
import { PaymentService } from 'src/app/services/payment.service'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { DialogService } from 'src/app/services/dialog.service'
import { selectDeletePaymentStatus } from './payment.selector'

@Injectable()
export class PaymenttEffects {
	private readonly openCreateOrUpdateDialog = createEffect(() => {
		return this.actions.pipe(
			ofType(openPaymentDialog),
			tap((val) => {
				this.paymentService.openPaymentDialog({ patient: val.patient, payment: val.payment })
			}),
		)
	}, { dispatch: false })

	private readonly createPayment = createEffect(() => {
		return this.actions.pipe(
			ofType(createPayment),
			switchMap((val) => {
				return this.paymentService.createPayment(val.payment).pipe(
					map((res) => {
						return createPaymentSuccess({ payment: res })
					}),
					catchError((err) => {
						return of(createPaymentError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private readonly findPayment = createEffect(() => {
		return this.actions.pipe(
			ofType(findPayments),
			switchMap((val) => {
				return this.paymentService.getPayments(val.query).pipe(
					map((res) => {
						return findPaymentsSuccess({ payments: res })
					}),
					catchError((err) => {
						return of(findPaymentsError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private readonly updatePayment = createEffect(() => {
		return this.actions.pipe(
			ofType(updatePayment),
			switchMap((val) => {
				return this.paymentService.updatePayment(val.id, val.payment).pipe(
					map((res) => {
						return updatePaymentSuccess({ payment: res })
					}),
					catchError((err) => {
						return of(updatePaymentError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private readonly deletePayment = createEffect(() => {
		return this.actions.pipe(
			ofType(deletePayment),
			switchMap((val) => {
				return this.paymentService.deletePayment(val.id).pipe(
					map((res) => {
						return deletePaymentSuccess({ payment: res })
					}),
					catchError((err) => {
						return of(deletePaymentError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private readonly openDeletePaymentDialog = createEffect(() => {
		return this.actions.pipe(
			ofType(openDeletePaymentDialog),
			tap((val) => {
				this.dialogService.openDeleteConfirmationDialog({
					dispatch: { action: deletePayment({ id: val.payment._id }), selector: selectDeletePaymentStatus },
					entityName: $localize `pagamento`,
				})
			}),
		)
	}, { dispatch: false })

	private readonly paymentError = createEffect(() => {
		return this.actions.pipe(
			ofType(createPaymentError, findPaymentsError, updatePaymentError, deletePaymentError),
			tap((val) => {
				this.snackbarService.error(val.error.errorMsg)
			}),
		)
	}, { dispatch: false })

	private readonly paymentSuccess = createEffect(() => {
		return this.actions.pipe(
			ofType(createPaymentSuccess, findPaymentsSuccess, updatePaymentSuccess, deletePaymentSuccess),
			tap((val) => {
				let message = ''

				switch (val.type) {
					case '[Payment] CreateSuccess':
						message = $localize `Pagamento criado com sucesso.`
						break
					case '[Payment] UpdateSuccess':
						message = $localize `Pagamento atualizado com sucesso.`
						break
					case '[Payment] DeleteSuccess':
						message = $localize `Pagamento removido com sucesso.`
						break
				}

				this.snackbarService.success(message)
			}),
		)
	}, { dispatch: false })

	constructor(
		private actions: Actions,
		private paymentService: PaymentService,
		private snackbarService: SnackbarService,
		private dialogService: DialogService) {}
}
