import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { openCreateOrUpdateDialog } from './store/patient.actions'

@Component({
	selector: 'app-patient',
	templateUrl: './patient.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientComponent {

	constructor(private store: Store) {}

	addPatient() {
		this.store.dispatch(openCreateOrUpdateDialog({}))
	}
}
