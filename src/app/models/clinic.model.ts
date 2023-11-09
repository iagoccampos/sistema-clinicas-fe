export interface Clinic {
	_id: string
	name: string
}

export type NewClinic = Omit<Clinic, '_id'>

export type ClinicQuery = Partial<Clinic>
