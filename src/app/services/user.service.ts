import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ClinicService } from './clinic.service'
import { INewUser, IUpdateUser, IUser, UserLevel } from '../models/user.model'
import { MatDialog } from '@angular/material/dialog'
import { DialogData, UserDialogComponent } from '../modules/admin/components/config/user/user-dialog/user-dialog.component'
import { UserPassDialogComponent } from '../modules/admin/components/config/user/user-password/user-pass.component'
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient, private dialog: MatDialog, private clinicService: ClinicService) { }

	getClinicUsers() {
		return this.http.get<IUser[]>(this.generateUrl(), { params: { clinicId: this.clinicService.currentClinicId || '' } })
	}

	addRegularUser(user: INewUser) {
		return this.http.post<IUser>(this.generateUrl(), {
			...user, level: UserLevel.Regular,
			clinic: this.clinicService.currentClinicId,
		})
	}

	addManagerUser(user: INewUser) {
		return this.http.post<IUser>(this.generateUrl(), {
			...user, level: UserLevel.Manager,
			clinic: this.clinicService.currentClinicId,
		})
	}

	updateUser(userId: string, user: IUpdateUser) {
		return this.http.put<IUser>(this.generateUrl(userId), user)
	}

	updateUserPass(userId: string, password: string) {
		return this.http.put<IUser>(this.generateUrl(userId), { password })
	}

	deleteUser(userId: string) {
		return this.http.delete<IUser>(this.generateUrl(userId))
	}

	openUserDialog(user?: IUser) {
		this.dialog.open<UserDialogComponent, DialogData>(UserDialogComponent, { data: { user } })
	}

	openUserPassDialog(user: IUser) {
		this.dialog.open<UserPassDialogComponent, DialogData>(UserPassDialogComponent, { data: { user } })
	}

	private generateUrl(userId?: string) {
		return `${environment.apiV1}/api/user${userId ? '/' + userId : ''}`
	}
}
