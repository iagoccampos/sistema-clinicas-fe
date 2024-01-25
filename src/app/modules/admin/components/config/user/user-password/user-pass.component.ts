import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { map } from 'rxjs'
import { IUser } from 'src/app/models/user.model'
import { updateUserPass } from '../store/user.actions'
import { selectUpdateUserPassStatus } from '../store/user.selector'
import { PassErrorStateMatcher, passConf } from 'src/app/shared/code-templates/reactive-form-validator'
import { BaseComponent } from 'src/app/shared/components/base/base.component'

export type DialogData = { user: IUser }

@Component({
	templateUrl: './user-pass.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPassDialogComponent extends BaseComponent {
	hidePass = true
	hideConfPass = true

	readonly matcher = new PassErrorStateMatcher()

	readonly loading$ = this.store.select(selectUpdateUserPassStatus).pipe(
		map((val) => {
			this.dialogRef.disableClose = val === 'loading'

			if(val === 'loading') {
				this.passForm.disable()
			}

			if(val === 'error') {
				this.passForm.enable()
			}

			if(val === 'success') {
				this.dialogRef.close()
			}

			return val === 'loading'
		}),
	)

	readonly passForm = new FormGroup({
		password: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)], nonNullable: true }),
		passwordConf: new FormControl('', { validators: passConf, nonNullable: true }),
	})

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
