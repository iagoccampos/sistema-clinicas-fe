export interface IClinic {
	_id: string
	name: string
	address?: {
		street: string
		city: string
		uf: string
		cep: string
	}
	company?: {
		name: string
		cnpj: string
	}
}

export type NewOrUpdateClinic = Omit<IClinic, '_id'>

export type ClinicQuery = { name: string }
