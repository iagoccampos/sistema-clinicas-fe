import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import { PAYMENT_METHODS } from 'src/app/constants/constants'
import { IPayment, PaymentMethods } from 'src/app/models/payment.model'
import { findPayments, openDeletePaymentDialog, openPaymentDialog } from '../store/payment.actions'
import { BaseComponent } from 'src/app/shared/components/base/base.component'
import { selectFindPaymentsStatusIsLoading, selectPayments, selectShouldGetPayments } from '../store/payment.selector'
import { takeUntil, debounceTime, filter, merge, tap, map } from 'rxjs'
import { MatPaginator } from '@angular/material/paginator'
import { Paginator } from 'src/app/models/pagination.model'

@Component({
	selector: 'app-find-payment',
	templateUrl: './find-payment.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindPaymentComponent extends BaseComponent implements AfterViewInit {
	readonly columnsToDisplay = ['index', 'card', 'date', 'value', 'method', 'options'] as const
	readonly paymentMethods = PAYMENT_METHODS.map((val) => val)

	readonly loading$ = this.store.select(selectFindPaymentsStatusIsLoading)
	readonly payments$ = this.store.select(selectPayments).pipe(
		tap((val) => {
			if(this.paginator) {
				this.paginator.length = val.total
			}
		}),
		map((val) => {
			return val.items || []
		}),
	)

	readonly findPaymentForm = new FormGroup({
		card: new FormControl('', { nonNullable: true }),
		method: new FormControl<PaymentMethods | ''>('', { nonNullable: true }),
		date: new FormControl('', { nonNullable: true }),
	})

	@ViewChild(MatPaginator) paginator!: MatPaginator

	constructor(private store: Store) {
		super()
	}

	ngAfterViewInit() {
		merge(
			this.paginator.page,
			this.store.select(selectShouldGetPayments).pipe(filter((val) => val)),
			this.findPaymentForm.valueChanges.pipe(filter(() => this.findPaymentForm.valid), debounceTime(500),
			),
		).pipe(takeUntil(this.destroy$)).subscribe(() => this.submit())

		this.submit()
	}

	updatePayment(payment: IPayment) {
		this.store.dispatch(openPaymentDialog({ payment }))
	}

	deletePayment(payment: IPayment) {
		this.store.dispatch(openDeletePaymentDialog({ payment }))
	}

	private submit() {
		this.store.dispatch(findPayments({ query: { ...this.findPaymentForm.value, ...new Paginator(this.paginator) } }))
	}
}
