import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { openCreateOrEditDialog } from './store/patient.actions'

@Component({
	selector: 'app-patient',
	templateUrl: './patient.component.html',
	styleUrls: ['./patient.component.scss'],
})
export class PatientComponent {

	constructor(private store: Store) {}

	addPatient() {
		this.store.dispatch(openCreateOrEditDialog({}))
	}
}
