export interface INewPatient {
	name: string
	birthday?: string
	rg?: string
	cpf?: string
	phones?: string[]
}

export interface IEditPatient extends INewPatient {}

export interface IFindPatient {
	filter: INewPatient
	page: number
	limit: number
}

export interface IPatient {
	_id: string
	name: string
	card: number
	rg?: string
	cpf?: string
	birthday?: string
	phones: string[]
	clinic: string
	createdAt: string
	updatedAt: string
}

export interface IPatientsResponse { total: number, items: IPatient[] }
