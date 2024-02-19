import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PaymentComponent } from './components/payment/payment.component'

const routes: Routes = [
	{ path: 'pagamentos', component: PaymentComponent },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClinicalRoutingModule { }
