import { ITimestamps } from './common.model'
import { IPaginationQuery } from './pagination.model'

export interface INewUpdatePatient {
	name: string
	birthday?: string
	rg?: string
	cpf?: string
	phones?: string[]
}

export interface IPatientQuery extends IPaginationQuery {
	name?: string
	birthday?: string
	rg?: string
	cpf?: string
	card?: string
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
