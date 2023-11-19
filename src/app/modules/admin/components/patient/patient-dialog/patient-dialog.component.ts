import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { map, tap } from 'rxjs'
import { Store } from '@ngrx/store'
import { IPatient } from 'src/app/models/patient.model'
import { createPatient, editPatient } from '../store/patient.actions'
import { selectEditOrCreateStatus } from '../store/patient.selector'

export type DialogData = { patient?: IPatient } | null

@Component({
	selector: 'app-new-user-dialog',
	templateUrl: './patient-dialog.component.html',
	styleUrls: ['./patient-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDialogComponent {
	loading$ = this.store.select(selectEditOrCreateStatus).pipe(
		tap((val) => {
			if(val === 'loading') {
				this.patientForm.disable()
			} else {
				if(val === 'success') {
					this.dialogRef.close()
				}
			}
		}),
		map((val) => {
			return val === 'loading'
		}),
	)

	readonly patientForm = new FormGroup({
		name: new FormControl('', { validators: [Validators.required, Validators.maxLength(40)], nonNullable: true }),
		birthday: new FormControl('', { nonNullable: true }),
		rg: new FormControl('', { nonNullable: true }),
		cpf: new FormControl('', { nonNullable: true }),
		phones: new FormArray([new FormControl('', { nonNullable: true })]),
	})

	get phonesControl() {
		return (this.patientForm.get('phones') as FormArray)
	}

	constructor(public dialogRef: MatDialogRef<PatientDialogComponent, void>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
		private store: Store) {
		if(data?.patient) {
			this.patientForm.patchValue(data.patient)
		}
	}

	addPhone() {
		if(this.phonesControl.length >= 5) {
			return
		}

		this.phonesControl.push(new FormControl('', { nonNullable: true }))
	}

	removePhone(index: number) {
		this.phonesControl.removeAt(index)
	}

	submit() {
		if(this.data?.patient) {
			this.store.dispatch(editPatient({ id: this.data.patient._id, patient: this.patientForm.getRawValue() }))
		} else {
			this.store.dispatch(createPatient({ patient: this.patientForm.getRawValue() }))
		}
	}
}
