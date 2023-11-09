import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Clinic, ClinicQuery } from '../models/clinic.model'

@Injectable({
	providedIn: 'root',
})
export class ClinicService {
	private readonly clinicUrl = '/api/clinic'

	constructor(private http: HttpClient) { }

	getClinics(query?: ClinicQuery) {
		return this.http.get<Clinic[]>(this.clinicUrl, { params: query })
	}

	getClinic(clinicId: string) {
		return this.http.get<Clinic | null>(`${this.clinicUrl}/${clinicId}`)
	}

	addClinic(newClinic: Omit<Clinic, '_id'>) {
		return this.http.post<Clinic>(this.clinicUrl, newClinic)
	}
}
