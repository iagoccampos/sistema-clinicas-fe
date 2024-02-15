import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { getUsers, openDeleteUserDialog, openUpdateUserPassDialog, openUserDialog } from './store/user.actions'
import { selectUsersStatusIsLoading, selectUsers } from './store/user.selector'
import { IUser } from 'src/app/models/user.model'
import { BaseComponent } from 'src/app/shared/components/base/base.component'

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent extends BaseComponent {
	readonly displayedColumns = ['name', 'username', 'options']

	readonly loading$ = this.store.select(selectUsersStatusIsLoading)
	readonly users$ = this.store.select(selectUsers)

	constructor(private store: Store) {
		super()
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
