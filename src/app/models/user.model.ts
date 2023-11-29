import { ITimestamps } from './common.model'

export enum UserLevel {
	Admin = 'Admin',
	Regular = 'Regular'
}

export interface INewUpdateUser {
	username: string
	level: UserLevel
}

export interface IUser extends INewUpdateUser, ITimestamps {
	_id: string
}
