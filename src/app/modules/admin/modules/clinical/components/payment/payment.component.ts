import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { BaseComponent } from 'src/app/shared/components/base/base.component'
import { openPaymentDialog } from './store/payment.actions'

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent extends BaseComponent {

	constructor(private store: Store) {
		super()
	}

	openDialog() {
		this.store.dispatch(openPaymentDialog({}))
	}
}
