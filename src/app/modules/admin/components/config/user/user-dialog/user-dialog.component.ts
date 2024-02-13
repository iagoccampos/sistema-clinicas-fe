import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { IUser } from 'src/app/models/user.model'
import { addUser, updateUser } from '../store/user.actions'
import { selectAddOrUpdateUserStatus } from '../store/user.selector'
import { PassErrorStateMatcher, passConf } from 'src/app/shared/code-templates/reactive-form-validator'
import { BaseComponent } from 'src/app/shared/components/base/base.component'
import { createModalLoadingManager } from 'src/app/shared/code-templates/modal-state-manager'

export type DialogData = { user?: IUser } | null

@Component({
	selector: 'app-user-dialog',
	templateUrl: './user-dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent extends BaseComponent {
	hidePass = true
	hideConfPass = true

	readonly matcher = new PassErrorStateMatcher()

	readonly userForm = new FormGroup({
		name: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(10)], nonNullable: true }),
		username: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)], nonNullable: true }),
		password: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)], nonNullable: true }),
		passwordConf: new FormControl('', { validators: passConf, nonNullable: true }),
	})

	readonly loading$ = createModalLoadingManager(this.store, selectAddOrUpdateUserStatus, this.userForm, this.dialogRef)

	constructor(public dialogRef: MatDialogRef<UserDialogComponent, void>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private store: Store) {
		super()

		if(data?.user) {
			this.userForm.patchValue(data.user)

			this.userForm.controls.password.clearValidators()
			this.userForm.controls.passwordConf.clearValidators()
		}

		dialogRef.updateSize('350px')
	}

	toggleHidePass() {
		this.hidePass = !this.hidePass
	}

	toggleHideConfPass() {
		this.hideConfPass = !this.hideConfPass
	}

	submit() {
		if(this.data?.user) {
			const user = { ...this.userForm.getRawValue(), password: undefined, passwordConf: undefined }
			this.store.dispatch(updateUser({ id: this.data.user._id, user }))
		} else {
			const user = { ...this.userForm.getRawValue(), passwordConf: undefined }
			this.store.dispatch(addUser({ user }))
		}
	}
}
