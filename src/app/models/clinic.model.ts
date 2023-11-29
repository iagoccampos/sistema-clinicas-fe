import { ITimestamps } from './common.model'

export interface INewUpdateClinic {
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

export interface IClinic extends INewUpdateClinic, ITimestamps {
	_id: string
}

export type ClinicQuery = { name: string }
