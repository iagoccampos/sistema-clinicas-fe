import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { INewUpdatePatient, IPatient } from '../models/patient.model'
import { MatDialog } from '@angular/material/dialog'
import { ClinicService } from './clinic.service'
import { DialogData, PatientDialogComponent } from '../modules/admin/components/patient/patient-dialog/patient-dialog.component'

@Injectable({
	providedIn: 'root',
})
export class PatientService {

	constructor(private http: HttpClient, private dialog: MatDialog, private clinicService: ClinicService) { }

	getPatients(filter: any, page?: number, limit?: number) {
		return this.http.get<{ total: number, items: IPatient[] }>(this.generateUrl(), { params: { ...filter, page, limit } })
	}

	createPatient(patient: INewUpdatePatient) {
		return this.http.post<IPatient>(this.generateUrl(), patient)
	}

	updatePatient(patientId: string, patient: INewUpdatePatient) {
		return this.http.put<IPatient>(this.generateUrl(patientId), patient)
	}

	deletePatient(patientId: string) {
		return this.http.delete(this.generateUrl(patientId))
	}

	openPatientDialog(patient?: IPatient) {
		this.dialog.open<PatientDialogComponent, DialogData>(PatientDialogComponent, { data: { patient } })
	}

	private generateUrl(patientId?: string) {
		if(!this.clinicService.currentClinicId) {
			throw new Error('Id da clínica nulo.')
		}

		return `/api/clinic/${this.clinicService.currentClinicId}/patient${patientId ? `/${patientId}` : ''}`
	}
}
