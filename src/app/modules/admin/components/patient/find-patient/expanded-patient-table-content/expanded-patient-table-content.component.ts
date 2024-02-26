import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { IPatient } from 'src/app/models/patient.model'
import { goToClientPayments, openPaymentDialog } from 'src/app/modules/admin/modules/clinical/components/payment/store/payment.actions'

@Component({
	selector: 'app-expanded-patient-table-content',
	templateUrl: './expanded-patient-table-content.component.html',
	styleUrls: ['./expanded-patient-table-content.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandedPatientTableContentComponent {
	@Input({ required: true }) patient!: IPatient

	constructor(private store: Store) {}

	createClinicalPayment() {
		this.store.dispatch(openPaymentDialog({ patient: this.patient }))
	}

	checkClinicalPayments() {
		this.store.dispatch(goToClientPayments({ patientCard: this.patient.card }))
	}
}
