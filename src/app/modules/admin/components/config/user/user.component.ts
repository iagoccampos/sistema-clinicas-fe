import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { getUsers, openDeleteUserDialog, openUpdateUserPassDialog, openUserDialog } from './store/user.actions'
import { selectGetUsersStatus, selectUsers } from './store/user.selector'
import { map } from 'rxjs'
import { IUser } from 'src/app/models/user.model'

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
	readonly displayedColumns = ['name', 'username', 'options']

	readonly loading$ = this.store.select(selectGetUsersStatus).pipe(
		map((val) => {
			return val === 'loading'
		}),
	)

	readonly users$ = this.store.select(selectUsers)

	constructor(private store: Store) {
		store.dispatch(getUsers())
	}

	addUser() {
		this.store.dispatch(openUserDialog({}))
	}

	updateUser(user: IUser) {
		this.store.dispatch(openUserDialog({ user }))
	}

	updatePassword(user: IUser) {
		this.store.dispatch(openUpdateUserPassDialog({ user }))
	}

	deleteUser(user: IUser) {
		this.store.dispatch(openDeleteUserDialog({ user }))
	}
}
