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

export interface IPatient extends INewUpdatePatient, ITimestamps {
	_id: string
	card: number
	clinic: string
}

export interface IPatientsResponse { total: number, items: IPatient[] }
