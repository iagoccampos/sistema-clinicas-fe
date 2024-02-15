import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { AdminRoutingModule } from './admin-routing.module'
import { NavbarComponent } from './components/navbar/navbar.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { AdminComponent } from './components/admin/admin.component'
import { ClinicsComponent } from './components/clinics/clinics.component'
import { NewClinicComponent } from './components/clinics/new-clinic/new-clinic.component'
import { newClinicReducer } from './components/clinics/new-clinic/store/new-clinic.reducer'
import { NewClinicEffects } from './components/clinics/new-clinic/store/new-clinic-effects'
import { SidenavComponent } from './components/sidenav/sidenav.component'
import { NavListItemComponent } from './components/sidenav/nav-list-item/nav-list-item.component'
import { ClinicComponent } from './components/clinic/clinic.component'
import { PatientComponent } from './components/patient/patient.component'
import { FindPatientComponent } from './components/patient/find-patient/find-patient.component'
import { PatientDialogComponent } from './components/patient/patient-dialog/patient-dialog.component'
import { PatientEffects } from './components/patient/store/patient.effects'
import { patientReducer } from './components/patient/store/patient.reducer'
import { ConfigComponent } from './components/config/config.component'
import { ConfigEffects } from './components/config/store/config/config.effects'
import { configReducer } from './components/config/store/config/config.reducer'
import { UserDialogComponent } from './components/config/user/user-dialog/user-dialog.component'
import { userReducer } from './components/config/user/store/user.reducer'
import { UserEffects } from './components/config/user/store/user.effects'
import { UserComponent } from './components/config/user/user.component'
import { UserPassDialogComponent } from './components/config/user/user-password/user-pass.component'
import { PaymentComponent } from './components/payment/payment.component'
import { paymentReducer } from './components/payment/store/payment.reducer'
import { PaymentDialogComponent } from './components/payment/payment-dialog/payment-dialog.component'
import { PaymenttEffects as PaymentEffects } from './components/payment/store/payment.effects'
import { FindPaymentComponent } from './components/payment/find-payment/find-payment.component'

@NgModule({
	declarations: [
		AdminComponent,
		NavbarComponent,
		ClinicComponent,
		ClinicsComponent,
		NewClinicComponent,
		SidenavComponent,
		NavListItemComponent,
		PatientComponent,
		PatientDialogComponent,
		FindPatientComponent,
		ConfigComponent,
		UserComponent,
		UserDialogComponent,
		UserPassDialogComponent,
		PaymentComponent,
		PaymentDialogComponent,
		FindPaymentComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		AdminRoutingModule,
		StoreModule.forFeature('newClinic', newClinicReducer),
		StoreModule.forFeature('patient', patientReducer),
		StoreModule.forFeature('payment', paymentReducer),
		StoreModule.forFeature('config', configReducer),
		StoreModule.forFeature('user', userReducer),
		EffectsModule.forFeature([
			NewClinicEffects,
			PatientEffects,
			PaymentEffects,
			ConfigEffects,
			UserEffects,
		]),
	],
})
export class AdminModule { }
