import { Component } from '@angular/core'
import { PatientService } from 'src/app/services/patient.service'

@Component({
	selector: 'app-patient',
	templateUrl: './patient.component.html',
	styleUrls: ['./patient.component.scss'],
})
export class PatientComponent {

	constructor(private patientService: PatientService) {}

	addPatient() {
		// this.patientService.openPatientDialog({ clinicId: this.clinicId })
	}
}
