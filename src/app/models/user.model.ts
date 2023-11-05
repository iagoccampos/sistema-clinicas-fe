export enum UserLevel {
	Admin = 'Admin',
	Regular = 'Regular'
}

export interface User {
	_id: string
	username: string
	level: UserLevel
}
