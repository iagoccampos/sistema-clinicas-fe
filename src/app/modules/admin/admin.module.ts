import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { AdminComponent } from './components/admin/admin.component'

@NgModule({
	declarations: [
		AdminComponent,
		NavbarComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		AdminRoutingModule,
	],
})
export class AdminModule { }
