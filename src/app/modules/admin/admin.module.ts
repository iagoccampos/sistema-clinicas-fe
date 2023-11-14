import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { AdminRoutingModule } from './admin-routing.module';
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

@NgModule({
	declarations: [
		AdminComponent,
		NavbarComponent,
		ClinicComponent,
		ClinicsComponent,
		NewClinicComponent,
		SidenavComponent,
		NavListItemComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		AdminRoutingModule,
		StoreModule.forFeature('newClinic', newClinicReducer),
		EffectsModule.forFeature([
			NewClinicEffects,
		]),
	],
})
export class AdminModule { }
