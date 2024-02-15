import { Pipe, type PipeTransform } from '@angular/core'
import { PaymentMethods } from 'src/app/models/payment.model'

@Pipe({
	name: 'paymentMethod',
})
export class PaymentMethodPipe implements PipeTransform {

	transform(value: PaymentMethods): string {
		switch (value) {
			case PaymentMethods.Money:
				return $localize `Dinheiro`
			case PaymentMethods.Debit:
				return $localize `Débito`
			case PaymentMethods.Credit:
				return $localize `Crédito`
		}
	}
}
