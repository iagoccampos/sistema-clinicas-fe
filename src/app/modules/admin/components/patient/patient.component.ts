import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { openCreateOrUpdateDialog } from './store/patient.actions'
import { BaseComponent } from 'src/app/shared/components/base/base.component'

@Component({
	selector: 'app-patient',
	templateUrl: './patient.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientComponent extends BaseComponent {

	constructor(private store: Store) {
		super()
	}

	addPatient() {
		this.store.dispatch(openCreateOrUpdateDialog({}))
	}
}
