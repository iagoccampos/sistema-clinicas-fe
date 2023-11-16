import { trigger, state, style, transition, animate } from '@angular/animations'
import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { interval } from 'rxjs'
import { debounce } from 'rxjs/operators'
import { IPatient } from 'src/app/models/patient.model'
// import { DialogService } from 'src/app/services/dialog.service'
import { PatientService } from 'src/app/services/patient.service'

@Component({
	selector: 'app-find-patient',
	templateUrl: './find-patient.component.html',
	styleUrls: ['./find-patient.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class FindPatientComponent implements AfterViewInit {

	findPatientsForm = new FormGroup({
		name: new FormControl('', { validators: [Validators.maxLength(40)], nonNullable: true }),
		birthday: new FormControl('', { nonNullable: true }),
		rg: new FormControl('', { nonNullable: true }),
		cpf: new FormControl('', { nonNullable: true }),
		card: new FormControl('', { nonNullable: true }),
	})

	displayedColumns: string[] = ['card', 'name', 'birthday', 'rg', 'cpf']
	dataSource: MatTableDataSource<IPatient> = new MatTableDataSource()
	expandedPatient: IPatient | null = null

	@ViewChild(MatPaginator) paginator!: MatPaginator

	constructor(private patientService: PatientService) {}

	ngAfterViewInit() {
		this.getPatients()

		// this.paginator.page.subscribe(() => {
		// 	this.getPatients()
		// })

		this.findPatientsForm.valueChanges.pipe(debounce(() => interval(1000))).subscribe(() => { this.getPatients() })
	}

	clearForm() {
		this.findPatientsForm.reset()
		this.getPatients()
	}

	editPatient(patient: IPatient) {
		// this.patientService.openPatientDialog({ clinicId: this.clinicId, patient })
	}

	deletePatient(patientId: string) {
		// this.dialogService.openDeleteConfirmationDialog().afterClosed().subscribe((result) => {
		// 	if(result) {
		// 		this.patientService.deletePatient(this.clinicId, patientId).subscribe(() => {
		// 			this.getPatients()
		// 		})
		// 	}
		// })
	}

	private getPatients() {
		// this.patientService.getPatients(this.clinicId, this.findPatientsForm.value, this.paginator.pageIndex, this.paginator.pageSize)
		// 	.subscribe((data) => {
		// 		this.paginator.length = data.total
		// 		this.dataSource.data = data.items
		// 	})
	}
}
