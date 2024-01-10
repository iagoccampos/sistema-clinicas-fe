import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs'
import { IClinic, ClinicQuery, INewUpdateClinic } from '../models/clinic.model'
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root',
})
export class ClinicService {
	private readonly clinicUrl = `${environment.apiV1}/api/clinic`

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

	addClinic(newClinic: INewUpdateClinic) {
		return this.http.post<IClinic>(this.clinicUrl, newClinic)
	}

	updateClinic(clinic: INewUpdateClinic) {
		return this.http.put<IClinic>(`${this.clinicUrl}/${this.currentClinicId}`, clinic).pipe(
			tap((val) => {
				this._currentClinic = val
			}),
		)
	}

	deleteClinic() {
		return this.http.delete<IClinic>(`${this.clinicUrl}/${this.currentClinicId}`)
	}
}
