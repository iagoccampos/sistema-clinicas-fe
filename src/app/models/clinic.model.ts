export interface IClinic {
	_id: string
	name: string
}

export type NewClinic = Omit<IClinic, '_id'>

export type ClinicQuery = Partial<IClinic>
