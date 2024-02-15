import { ITimestamps } from './common.model'
import { IPaginationQuery, PaginationResponse } from './pagination.model'

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
	_id: string
	name: string
	birthday?: string
	rg?: string
	cpf?: string
	phones?: string[]
	card: string
	clinic: string
}

export type IPatientResponse = PaginationResponse<IPatient>
