import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { BehaviorSubject } from 'rxjs'
import { IPatient } from 'src/app/models/patient.model'
import { PatientService } from 'src/app/services/patient.service'

export type DialogData = { clinicId: string, patient?: IPatient }

export type DialogReturn = { changed: boolean }

@Component({
	selector: 'app-new-user-dialog',
	templateUrl: './patient-dialog.component.html',
	styleUrls: ['./patient-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDialogComponent {
	private readonly onFormSubmitSub$ = new BehaviorSubject(false)
	readonly onFormSubmit$ = this.onFormSubmitSub$.asObservable()

	readonly patientForm = new FormGroup({
		name: new FormControl('', { validators: [Validators.required, Validators.maxLength(40)], nonNullable: true }),
		birthday: new FormControl('', { nonNullable: true }),
		rg: new FormControl('', { nonNullable: true }),
		cpf: new FormControl('', { nonNullable: true }),
		phones: new FormArray([new FormControl('')]),
	})

	get phonesControl() {
		return (this.patientForm.get('phones') as FormArray)
	}

	constructor(public dialogRef: MatDialogRef<PatientDialogComponent, DialogReturn>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
		private patientService: PatientService) {
		if(data.patient) {
			// this.patientForm.patchValue(data.patient)
		}
	}

	addPhone() {
		if(this.phonesControl.length >= 5) {
			return
		}

		this.phonesControl.push(new FormControl())
	}

	removePhone(index: number) {
		this.phonesControl.removeAt(index)
	}

	submit() {
		if(this.patientForm.invalid) {
			this.patientForm.markAllAsTouched()
			return
		}

		this.onFormSubmitSub$.next(true)

		if(this.data.patient) {
			// this.patientService.editPatient(this.patientForm.getRawValue(), this.data.clinicId, this.data.patient._id).subscribe(() => {
			// 	this.dialogRef.close()
			// }, (err) => {
			// 	this.onFormSubmitSub$.next(false)
			// })
		} else {
			// this.patientService.createPatient(this.patientForm.getRawValue(), this.data.clinicId).subscribe(() => {
			// 	this.dialogRef.close()
			// }, (err) => {
			// 	this.onFormSubmitSub$.next(false)
			// })
		}
	}
}
