import { Component, Input } from '@angular/core'
import { PatientService } from 'src/app/services/patient.service'

@Component({
	selector: 'app-patient',
	templateUrl: './patient.component.html',
	styleUrls: ['./patient.component.scss'],
})
export class PatientComponent {
	@Input({ alias: 'id', required: true }) clinicId: string | null = null

	constructor(private patientService: PatientService) {
	}

	addPatient() {
		// this.patientService.openPatientDialog({ clinicId: this.clinicId })
	}
}
