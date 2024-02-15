import { ITimestamps } from './common.model'

export interface INewUpdatePatient {
	name: string
	birthday?: string
	rg?: string
	cpf?: string
	phones?: string[]
}

export interface IFindPatient {
	filter: INewUpdatePatient
	page: number
	limit: number
}

export interface IPatient extends ITimestamps {
	name: string
	birthday?: string
	rg?: string
	cpf?: string
	phones?: string[]
	_id: string
	card: string
	clinic: string
}

export interface IPatientsResponse { total: number, items: IPatient[] }
