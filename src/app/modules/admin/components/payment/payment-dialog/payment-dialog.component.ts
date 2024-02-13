import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { BaseComponent } from 'src/app/shared/components/base/base.component'
import { selectCreateStatus } from '../store/payment.selector'
import { map, tap } from 'rxjs'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { PAYMENT_METHODS } from 'src/app/constants/constants'
import { createLoadManager as createModalLoadingManager } from 'src/app/shared/code-templates/modal-state-manager'
import { createPayment } from '../store/payment.actions'
import { IPayment, PaymentMethods } from 'src/app/models/payment.model'

@Component({
	selector: 'app-payment-dialog',
	templateUrl: './payment-dialog.component.html',
	styleUrls: ['./payment-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentDialogComponent extends BaseComponent {
	readonly paymentMethods = PAYMENT_METHODS.map((val) => val)

	readonly paymentForm = new FormGroup({
		card: new FormControl('', { nonNullable: true }),
		date: new FormControl(new Date(), { nonNullable: true }),
		value: new FormControl(0, { validators: [Validators.min(0.01)], nonNullable: true }),
		method: new FormControl<PaymentMethods>(PaymentMethods.Dinheiro, { nonNullable: true }),
	})

	readonly loading$ = createModalLoadingManager(this.store, selectCreateStatus, this.paymentForm, this.dialogRef)

	constructor(
		private dialogRef: MatDialogRef<PaymentDialogComponent, void>,
		@Inject(MAT_DIALOG_DATA) private data: { payment?: IPayment },
		private store: Store) {
		super()
	}

	submit() {
		this.store.dispatch(createPayment({ payment: this.paymentForm.getRawValue() }))
	}
}
