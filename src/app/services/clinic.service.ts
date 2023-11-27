import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs'
import { IClinic, ClinicQuery } from '../models/clinic.model'

@Injectable({
	providedIn: 'root',
})
export class ClinicService {
	private readonly clinicUrl = '/api/clinic'

	private _currentClinic: IClinic | null = null

	get currentClinicId() {
		return this._currentClinic?._id || null
	}

	get currentClinic() {
		return JSON.parse(JSON.stringify(this._currentClinic)) as IClinic
	}

	constructor(private http: HttpClient) { }

	getClinics(query?: ClinicQuery) {
		return this.http.get<IClinic[]>(this.clinicUrl, { params: query })
	}

	getClinic(clinicId: string, setCurrentClinic = true) {
		return this.http.get<IClinic | null>(`${this.clinicUrl}/${clinicId}`).pipe(
			tap((val) => {
				if(setCurrentClinic) {
					this._currentClinic = val
				}
			}),
		)
	}

	addClinic(newClinic: Omit<IClinic, '_id'>) {
		return this.http.post<IClinic>(this.clinicUrl, newClinic)
	}

	deleteClinic() {
		return this.http.delete<IClinic>(`${this.clinicUrl}/${this.currentClinicId}`)
	}
}
