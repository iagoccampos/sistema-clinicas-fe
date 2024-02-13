import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { IUser } from 'src/app/models/user.model'
import { updateUserPass } from '../store/user.actions'
import { selectUpdateUserPassStatus } from '../store/user.selector'
import { PassErrorStateMatcher, passConf } from 'src/app/shared/code-templates/reactive-form-validator'
import { BaseComponent } from 'src/app/shared/components/base/base.component'
import { createModalLoadingManager } from 'src/app/shared/code-templates/modal-state-manager'

export type DialogData = { user: IUser }

@Component({
	templateUrl: './user-pass.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPassDialogComponent extends BaseComponent {
	hidePass = true
	hideConfPass = true

	readonly matcher = new PassErrorStateMatcher()

	readonly passForm = new FormGroup({
		password: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)], nonNullable: true }),
		passwordConf: new FormControl('', { validators: passConf, nonNullable: true }),
	})

	readonly loading$ = createModalLoadingManager(this.store, selectUpdateUserPassStatus, this.passForm, this.dialogRef)

	constructor(public dialogRef: MatDialogRef<UserPassDialogComponent, void>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private store: Store) {
		super()
		dialogRef.updateSize('350px')
	}

	toggleHidePass() {
		this.hidePass = !this.hidePass
	}

	toggleHideConfPass() {
		this.hideConfPass = !this.hideConfPass
	}

	submit() {
		this.store.dispatch(updateUserPass({ id: this.data.user._id, password: this.passForm.controls.password.value }))
	}
}
