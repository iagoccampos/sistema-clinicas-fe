import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs'
import { Clinic, ClinicQuery } from '../models/clinic.model'

@Injectable({
	providedIn: 'root',
})
export class ClinicService {
	private readonly clinicUrl = '/api/clinic'

	private _currentClinicId: string | null = null

	get currentClinicId() {
		return this._currentClinicId
	}

	constructor(private http: HttpClient) { }

	getClinics(query?: ClinicQuery) {
		return this.http.get<Clinic[]>(this.clinicUrl, { params: query })
	}

	getClinic(clinicId: string, setCurrentClinicId = true) {
		return this.http.get<Clinic | null>(`${this.clinicUrl}/${clinicId}`).pipe(
			tap(() => {
				if(setCurrentClinicId) {
					this._currentClinicId = clinicId
				}
			}),
		)
	}

	addClinic(newClinic: Omit<Clinic, '_id'>) {
		return this.http.post<Clinic>(this.clinicUrl, newClinic)
	}
}
