import { trigger, state, style, transition, animate } from '@angular/animations'
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { merge } from 'rxjs'
import { debounceTime, filter, map, tap } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { IPatient } from 'src/app/models/patient.model'
import { selectPatients, selectFindStatusIsLoading, selectShouldGetPatients } from '../store/patient.selector'
import { findPatients, openCreateOrUpdateDialog, openDeleteDialog } from '../store/patient.actions'
import { BaseComponent } from 'src/app/shared/components/base/base.component'
import { openPaymentDialog } from '../../../modules/clinical/components/payment/store/payment.actions'
import { Paginator } from 'src/app/models/pagination.model'

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
export class FindPatientComponent extends BaseComponent implements AfterViewInit {
	readonly columnsToDisplay = ['card', 'name', 'rg', 'cpf', 'birthday', 'actions'] as const
	readonly columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'] as const

	readonly loading$ = this.store.select(selectFindStatusIsLoading)
	readonly patients$ = this.store.select(selectPatients).pipe(
		tap((val) => {
			if(this.paginator) {
				this.paginator.length = val.total
			}
		}),
		map((val) => {
			return val.items || []
		}),
	)

	readonly findPatientsForm = new FormGroup({
		name: new FormControl('', { validators: [Validators.maxLength(40)], nonNullable: true }),
		birthday: new FormControl('', { nonNullable: true }),
		rg: new FormControl('', { nonNullable: true }),
		cpf: new FormControl('', { nonNullable: true }),
		card: new FormControl('', { nonNullable: true }),
	})

	expandedPatient: IPatient | null = null

	@ViewChild(MatPaginator) paginator!: MatPaginator

	constructor(private store: Store) {
		super()
	}

	ngAfterViewInit() {
		merge(
			this.paginator.page,
			this.store.select(selectShouldGetPatients).pipe(filter((val) => val)),
			this.findPatientsForm.valueChanges.pipe(filter(() => this.findPatientsForm.valid), debounceTime(500)),
		).subscribe(() => this.submit())

		this.submit()
	}

	clearForm() {
		this.findPatientsForm.reset()
	}

	createPayment(patient: IPatient) {
		this.store.dispatch(openPaymentDialog({ patient }))
	}

	updatePatient(patient: IPatient) {
		this.store.dispatch(openCreateOrUpdateDialog({ patient }))
	}

	deletePatient(patient: IPatient) {
		this.store.dispatch(openDeleteDialog({ patient }))
	}

	private submit() {
		this.store.dispatch(findPatients({ query: { ...this.findPatientsForm.value, ...new Paginator(this.paginator) } }))
	}
}
