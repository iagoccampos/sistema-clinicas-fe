import { IClinic } from './clinic.model'
import { ITimestamps } from './common.model'
import { IPaginationQuery } from './pagination.model'
import { IPatient } from './patient.model'

export enum PaymentMethods {
	Money = 'DINHEIRO',
	Debit = 'DEBITO',
	Credit = 'CREDITO',
}

export interface INewOrUpdatePayment {
	card: string
	date: Date
	value: number
	method: PaymentMethods
}

export interface IPayment extends ITimestamps {
	_id: string
	date: Date
	value: number
	method: PaymentMethods
	patient: string | IPatient
	clinic: string | IClinic
}

export interface IPaymentQuery extends IPaginationQuery {
	card?: string
	date?: string
	method?: string
}
