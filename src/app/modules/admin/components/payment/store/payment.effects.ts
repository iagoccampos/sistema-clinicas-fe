import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { createPayment, createPaymentError, createPaymentSuccess, openDialog } from './payment.actions'
import { PaymentService } from 'src/app/services/payment.service'
import { SnackbarService } from 'src/app/services/snackbar.service'

@Injectable()
export class PaymenttEffects {
	private readonly openCreateOrUpdateDialog = createEffect(() => {
		return this.actions.pipe(
			ofType(openDialog),
			tap(() => {
				this.paymentService.openPaymentDialog()
			}),
		)
	}, { dispatch: false })

	private readonly creatPayment = createEffect(() => {
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

	private readonly paymentError = createEffect(() => {
		return this.actions.pipe(
			ofType(createPaymentError),
			tap((val) => {
				this.snackbarService.error(val.error.errorMsg)
			}),
		)
	}, { dispatch: false })

	private readonly paymentSuccess = createEffect(() => {
		return this.actions.pipe(
			ofType(createPaymentSuccess),
			tap((val) => {
				let message = ''

				switch (val.type) {
					case '[Payment] CreateSuccess':
						message = 'Pagamento criado com sucesso.'
						break
				}

				this.snackbarService.success(message)
			}),
		)
	}, { dispatch: false })

	constructor(private actions: Actions, private paymentService: PaymentService, private snackbarService: SnackbarService) {}
}
