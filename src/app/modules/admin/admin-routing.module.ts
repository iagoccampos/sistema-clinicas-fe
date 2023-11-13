import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component'
import { ClinicsComponent } from './components/clinics/clinics.component'

const routes: Routes = [
	{ path: '', component: AdminComponent, children: [
		{ path: '', redirectTo: 'clinicas', pathMatch: 'full' },
		{ path: 'clinicas', component: ClinicsComponent },
	] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule { }
