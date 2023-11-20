import { trigger, state, style, transition, animate } from '@angular/animations'
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { interval, merge } from 'rxjs'
import { debounce, filter, map, tap } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { IPatient, IPatientsResponse } from 'src/app/models/patient.model'
import { selectDeleteStatus, selectEditOrCreateStatus, selectFindStatus, selectPatients } from '../store/patient.selector'
import { findPatients, openCreateOrEditDialog, openDeleteDialog } from '../store/patient.actions'

@Component({
	selector: 'app-find-patient',
	templateUrl: './find-patient.component.html',
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindPatientComponent implements AfterViewInit {
	readonly patients$ = this.store.select(selectPatients).pipe(
		filter((val): val is IPatientsResponse => !!val),
		tap((val) => {
			if(this.paginator) {
				this.paginator.length = val.total
			}
		}),
		map((val) => {
			return val.items || []
		}),
	)

	readonly loading$ = this.store.select(selectFindStatus).pipe(
		map((val) => {
			return val === 'loading'
		}),
	)

	readonly findPatientsForm = new FormGroup({
		name: new FormControl('', { validators: [Validators.maxLength(40)], nonNullable: true }),
		birthday: new FormControl('', { nonNullable: true }),
		rg: new FormControl('', { nonNullable: true }),
		cpf: new FormControl('', { nonNullable: true }),
		card: new FormControl('', { nonNullable: true }),
	})

	readonly columnsToDisplay = ['card', 'name', 'rg', 'cpf', 'birthday', 'actions'] as const
	readonly columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'] as const

	expandedPatient: IPatient | null = null

	@ViewChild(MatPaginator) paginator!: MatPaginator

	get searchForm() {
		return { filter: this.findPatientsForm.getRawValue(), page: this.paginator.pageIndex, limit: this.paginator.pageSize }
	}

	constructor(private store: Store) {}

	ngAfterViewInit() {
		this.store.dispatch(findPatients({ search: this.searchForm }))

		merge(
			this.paginator.page,
			this.store.select(selectEditOrCreateStatus).pipe(filter((val) => val === 'success')),
			this.store.select(selectDeleteStatus).pipe(filter((val) => val === 'success')),
			this.findPatientsForm.valueChanges.pipe(debounce(() => interval(1000))),
		).subscribe(() => this.store.dispatch(findPatients({ search: this.searchForm })))
	}

	clearForm() {
		this.findPatientsForm.reset({}, { emitEvent: false })
		this.store.dispatch(findPatients({ search: this.searchForm }))
	}

	editPatient(patient: IPatient) {
		this.store.dispatch(openCreateOrEditDialog({ patient }))
	}

	deletePatient(patient: IPatient) {
		this.store.dispatch(openDeleteDialog({ patient }))
	}
}
