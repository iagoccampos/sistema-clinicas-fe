import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { INewPatient, IPatient } from '../models/patient.model'
import { MatDialog } from '@angular/material/dialog'
import { ClinicService } from './clinic.service'

@Injectable({
	providedIn: 'root',
})
export class PatientService {

	constructor(private http: HttpClient, private dialog: MatDialog, private clinicService: ClinicService) { }

	getPatients(filter: any, page?: number, limit?: number) {
		const params = { ...filter, page, limit }
		return this.http.get<{ total: number, items: IPatient[] }>(this.generateUrl(), { params })
	}

	createPatient(patient: INewPatient) {
		return this.http.post<IPatient>(this.generateUrl(), patient)
	}

	editPatient(patientId: string, patient: IPatient) {
		return this.http.put<IPatient>(this.generateUrl(patientId), patient)
	}

	deletePatient(patientId: string) {
		return this.http.delete(this.generateUrl(patientId))
	}

	private generateUrl(patientId?: string) {
		return `/api/clinic/${this.clinicService.currentClinicId}/patient${patientId ? `/${patientId}` : ''}`
	}
}
