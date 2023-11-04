import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { INewPatient, IPatient } from '../models/patient.model'
import { MatDialog } from '@angular/material/dialog'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  getPatients(clinicId: string, filter: any, page?: number, limit?: number) {
    const params = { ...filter, page, limit }
    return this.http.get<{ total: number, items: IPatient[] }>(this.generateUrl(clinicId), { params })
  }

  createPatient(patient: INewPatient, clinicId: string) {
    return this.http.post<IPatient>(this.generateUrl(clinicId), patient)
  }

  editPatient(patient: IPatient, clinicId: string, patientId: string) {
    return this.http.put<IPatient>(this.generateUrl(clinicId, patientId), patient)
  }

  deletePatient(clinicId: string, patientId: string) {
    return this.http.delete(this.generateUrl(clinicId, patientId))
  }

  private generateUrl(clinicId: string, patientId?: string) {
    return `/api/clinic/${clinicId}/patient${patientId ? `/${patientId}` : ''}`
  }
}
