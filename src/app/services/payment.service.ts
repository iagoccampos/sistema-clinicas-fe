import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ClinicService } from './clinic.service'
import { IPaymentModalData, PaymentDialogComponent } from '../modules/admin/components/clinical/payment/payment-dialog/payment-dialog.component'
import { INewOrUpdatePayment, IPayment, IPaymentQuery, IPaymentResponse } from '../models/payment.model'

@Injectable({
	providedIn: 'root',
})
export class PaymentService {

	constructor(private http: HttpClient, private dialog: MatDialog, private clinicService: ClinicService) { }

	openPaymentDialog(data?: IPaymentModalData) {
		this.dialog.open(PaymentDialogComponent, { data, width: '400px' })
	}

	createPayment(payment: INewOrUpdatePayment) {
		return this.http.post<IPayment>(this.generateUrl(), payment)
	}

	getPayments(query?: IPaymentQuery) {
		return this.http.get<IPaymentResponse>(this.generateUrl(), { params: { ...query } })
	}

	getPayment(paymentId: string) {
		return this.http.get<IPayment[]>(this.generateUrl(paymentId))
	}

	updatePayment(paymentId: string, payment: INewOrUpdatePayment) {
		return this.http.put<IPayment>(this.generateUrl(paymentId), payment)
	}

	deletePayment(paymentId: string) {
		return this.http.delete<IPayment>(this.generateUrl(paymentId))
	}

	private generateUrl(paymentId?: string) {
		if(!this.clinicService.currentClinicId) {
			throw new Error('Id da clínica nulo.')
		}

		return `/api/clinic/${this.clinicService.currentClinicId}/clinical/payment${paymentId ? `/${paymentId}` : ''}`
	}
}
