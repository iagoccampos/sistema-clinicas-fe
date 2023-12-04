import { ITimestamps } from './common.model'

export enum UserLevel {
	Admin = 'Admin',
	Manager = 'Manager',
	Regular = 'Regular'
}

export interface INewUser {
	name: string
	username: string
	password: string
}

export interface IUpdateUser {
	name: string
	username: string
}

export interface IUpdateUserPass {
	password: string
}

export interface IUser extends ITimestamps {
	_id: string
	name: string
	username: string
	level: UserLevel
}
