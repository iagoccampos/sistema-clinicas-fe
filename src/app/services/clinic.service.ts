import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ClinicModel, ClinicQuery } from '../models/clinic.model'

@Injectable({
	providedIn: 'root',
})
export class ClinicService {
	private readonly clinicUrl = '/api/clinic'

	constructor(private http: HttpClient) { }

	getClinics(query?: ClinicQuery) {
		return this.http.get<ClinicModel[]>(this.clinicUrl, { params: query })
	}

	getClinic(clinicId: string) {
		return this.http.get<ClinicModel | null>(`${this.clinicUrl}/${clinicId}`)
	}

	addClinic(newClinic: ClinicModel) {
		return this.http.post<ClinicModel>(this.clinicUrl, newClinic)
	}
}
