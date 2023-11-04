export interface INewPatient {
	name: string
	birthday?: string
	rg?: string
	cpf?: string
	phones?: string[]
}

export interface IPatient {
	_id: string
	name: string
	card: number
	rg?: string
	cpf?: string
	birthday?: Date
	phones: string[]
	clinic: string
}
