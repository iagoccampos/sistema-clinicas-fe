export enum UserLevel {
	Admin = 'Admin',
	Regular = 'Regular'
}

export interface IUser {
	_id: string
	username: string
	level: UserLevel
}
