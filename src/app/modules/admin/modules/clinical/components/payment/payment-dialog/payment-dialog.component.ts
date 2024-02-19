import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { BaseComponent } from 'src/app/shared/components/base/base.component'
import { selectCreateOrUpdatePaymentStatus } from '../store/payment.selector'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { PAYMENT_METHODS } from 'src/app/constants/constants'
import { createModalLoadingManager } from 'src/app/shared/code-templates/modal-loading-state-manager'
import { createPayment, updatePayment } from '../store/payment.actions'
import { IPayment, PaymentMethods } from 'src/app/models/payment.model'
import { IPatient } from 'src/app/models/patient.model'
import { PatientService } from 'src/app/services/patient.service'

export interface IPaymentModalData {
	payment?: IPayment
	patient?: IPatient
}

@Component({
	selector: 'app-payment-dialog',
	templateUrl: './payment-dialog.component.html',
	styleUrls: ['./payment-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentDialogComponent extends BaseComponent {
	readonly paymentMethods = PAYMENT_METHODS.map((val) => val)

	readonly paymentForm = new FormGroup({
		card: new FormControl('', { validators: [Validators.required], asyncValidators: [this.patitentService.patientExistsFactory()], nonNullable: true }),
		date: new FormControl(new Date(), { nonNullable: true }),
		value: new FormControl(0, { validators: [Validators.min(0.01)], nonNullable: true }),
		method: new FormControl<PaymentMethods>(PaymentMethods.Money, { nonNullable: true }),
	})

	readonly loading$ = createModalLoadingManager(selectCreateOrUpdatePaymentStatus, this.paymentForm, this.dialogRef)

	constructor(
		private dialogRef: MatDialogRef<PaymentDialogComponent, void>,
		@Inject(MAT_DIALOG_DATA) public data: IPaymentModalData,
		private store: Store,
		private patitentService: PatientService) {
		super()

		if(data.patient) {
			this.paymentForm.controls.card.setValue(data.patient.card)
		}

		if(data.payment) {
			const card = typeof data.payment.patient === 'string' ? '' : data.payment.patient.card
			this.paymentForm.patchValue({ ...data.payment, card })
		}
	}

	submit() {
		if(this.data.payment) {
			this.store.dispatch(updatePayment({ id: this.data.payment._id, payment: this.paymentForm.getRawValue() }))
		} else {
			this.store.dispatch(createPayment({ payment: this.paymentForm.getRawValue() }))
		}
	}
}
