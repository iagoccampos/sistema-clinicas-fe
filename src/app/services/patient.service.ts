import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { INewUpdatePatient, IPatient, IPatientQuery, IPatientResponse } from '../models/patient.model'
import { MatDialog } from '@angular/material/dialog'
import { ClinicService } from './clinic.service'
import { DialogData, PatientDialogComponent } from '../modules/admin/components/patient/patient-dialog/patient-dialog.component'
import { AbstractControl, ValidationErrors } from '@angular/forms'
import { Observable, of, delay, switchMap, map, catchError } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class PatientService {

	constructor(private http: HttpClient, private dialog: MatDialog, private clinicService: ClinicService) { }

	getPatients(query: IPatientQuery) {
		return this.http.get<IPatientResponse>(this.generateUrl(), { params: { ...query } })
	}

	getPatientByCard(card: string) {
		return this.http.get<IPatient>(this.generateUrl() + '/find-by-card', { params: { card } })
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

	patientExistsFactory() {
		return (control: AbstractControl): Observable<ValidationErrors | null> => {
			return of(control.value).pipe(
				delay(600),
				switchMap((val) => this.getPatientByCard(val).pipe(
					map((patient) => (patient ? null : { notFound: true })),
					catchError(() => of({ notFound: true })),
				)),
			)
		}
	}

	private generateUrl(patientId?: string) {
		if(!this.clinicService.currentClinicId) {
			throw new Error('Id da clínica nulo.')
		}

		return `/api/clinic/${this.clinicService.currentClinicId}/patient${patientId ? `/${patientId}` : ''}`
	}
}
