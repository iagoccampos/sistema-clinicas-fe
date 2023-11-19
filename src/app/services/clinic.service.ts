import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs'
import { Clinic, ClinicQuery } from '../models/clinic.model'

@Injectable({
	providedIn: 'root',
})
export class ClinicService {
	private readonly clinicUrl = '/api/clinic'

	private _currentClinic: Clinic | null = null

	get currentClinicId() {
		return this._currentClinic?._id || null
	}

	get currentClinic() {
		return JSON.parse(JSON.stringify(this._currentClinic)) as Clinic
	}

	constructor(private http: HttpClient) { }

	getClinics(query?: ClinicQuery) {
		return this.http.get<Clinic[]>(this.clinicUrl, { params: query })
	}

	getClinic(clinicId: string, setCurrentClinic = true) {
		return this.http.get<Clinic | null>(`${this.clinicUrl}/${clinicId}`).pipe(
			tap((val) => {
				if(setCurrentClinic) {
					this._currentClinic = val

				}
			}),
		)
	}

	addClinic(newClinic: Omit<Clinic, '_id'>) {
		return this.http.post<Clinic>(this.clinicUrl, newClinic)
	}
}
