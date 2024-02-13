import { ITimestamps } from './common.model'

export enum PaymentMethods {
	Dinheiro = 'DINHEIRO',
	Debito = 'DEBITO',
	Credito = 'CREDITO',
}

export interface INewPayment {
	card: string
	date: Date
	value: number
	method: PaymentMethods
}

export interface IPayment extends INewPayment, ITimestamps {
	_id: string
	clinic: string
}
