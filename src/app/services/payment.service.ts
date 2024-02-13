import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ClinicService } from './clinic.service'
import { PaymentDialogComponent } from '../modules/admin/components/payment/payment-dialog/payment-dialog.component'
import { delay, of } from 'rxjs'
import { INewPayment, IPayment } from '../models/payment.model'

@Injectable({
	providedIn: 'root',
})
export class PaymentService {

	constructor(private http: HttpClient, private dialog: MatDialog, private clinicService: ClinicService) { }

	openPaymentDialog(payment?: IPayment) {
		this.dialog.open(PaymentDialogComponent, { data: { payment }, width: '400px' })
	}

	createPayment(payment: INewPayment) {
		return of(payment).pipe(delay(1000))
	}
}
