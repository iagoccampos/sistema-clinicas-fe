import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { IPatient } from 'src/app/models/patient.model'
import { createPatient, updatePatient } from '../store/patient.actions'
import { selectCreateOrUpdateStatus } from '../store/patient.selector'
import { BaseComponent } from 'src/app/shared/components/base/base.component'
import { createModalLoadingManager } from 'src/app/shared/code-templates/modal-loading-state-manager'

export type DialogData = { patient?: IPatient } | null

@Component({
	selector: 'app-new-patient-dialog',
	templateUrl: './patient-dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDialogComponent extends BaseComponent {

	readonly patientForm = new FormGroup({
		name: new FormControl('', { validators: [Validators.required, Validators.maxLength(40)], nonNullable: true }),
		birthday: new FormControl('', { nonNullable: true }),
		rg: new FormControl('', { nonNullable: true }),
		cpf: new FormControl('', { nonNullable: true }),
		phones: new FormArray([new FormControl('', { nonNullable: true })]),
	})

	loading$ = createModalLoadingManager(selectCreateOrUpdateStatus, this.patientForm, this.dialogRef)

	get phonesControl() {
		return (this.patientForm.get('phones') as FormArray)
	}

	constructor(public dialogRef: MatDialogRef<PatientDialogComponent, void>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
		private store: Store) {
		super()
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
			this.store.dispatch(updatePatient({ id: this.data.patient._id, patient: this.patientForm.getRawValue() }))
		} else {
			this.store.dispatch(createPatient({ patient: this.patientForm.getRawValue() }))
		}
	}
}
