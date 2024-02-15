import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdminComponent } from './components/admin/admin.component'
import { ClinicsComponent } from './components/clinics/clinics.component'
import { ClinicComponent } from './components/clinic/clinic.component'
import { PatientComponent } from './components/patient/patient.component'
import { ConfigComponent } from './components/config/config.component'
import { PaymentComponent } from './components/clinical/payment/payment.component'

const routes: Routes = [
	{ path: '', component: AdminComponent, children: [
		{ path: '', redirectTo: 'clinicas', pathMatch: 'full' },
		{ path: 'clinicas', component: ClinicsComponent },
		{ path: 'clinica/:clinicId', component: ClinicComponent, children: [
			{ path: '', redirectTo: 'pacientes', pathMatch: 'full' },
			{ path: 'pacientes', component: PatientComponent },
			{ path: 'clinico', children: [
				{ path: 'pagamentos', component: PaymentComponent },
			] },
			{ path: 'configuracao', component: ConfigComponent },
		] },
	] },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule { }
