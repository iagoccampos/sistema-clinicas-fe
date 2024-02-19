import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared/shared.module'
import { ClinicalRoutingModule } from './clinical-routing.module'
import { FindPaymentComponent } from './components/payment/find-payment/find-payment.component'
import { PaymentDialogComponent } from './components/payment/payment-dialog/payment-dialog.component'
import { PaymentComponent } from './components/payment/payment.component'
import { StoreModule } from '@ngrx/store'
import { paymentReducer } from './components/payment/store/payment.reducer'
import { EffectsModule } from '@ngrx/effects'
import { PaymentEffects } from './components/payment/store/payment.effects'

@NgModule({
	declarations: [
		PaymentComponent,
		PaymentDialogComponent,
		FindPaymentComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		ClinicalRoutingModule,
		StoreModule.forFeature('payment', paymentReducer),
		EffectsModule.forFeature([
			PaymentEffects,
		]),
	],
})
export class ClinicalModule {}
