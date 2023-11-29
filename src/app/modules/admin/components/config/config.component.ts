import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { openDeleteClinicDialog, updateClinic } from './store/config.actions'
import { ClinicService } from 'src/app/services/clinic.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { states } from 'src/app/constants/constants'
import { selectUpdateClinicStatus } from './store/config.selector'
import { map, tap } from 'rxjs'

@Component({
	selector: 'app-config',
	templateUrl: './config.component.html',
	styleUrls: ['./config.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigComponent {
	readonly ufs = states.map((val) => val.uf)

	readonly loading$ = this.store.select(selectUpdateClinicStatus).pipe(
		tap((val) => {
			if(val === 'loading') {
				this.clinciDataForm.disable()
			} else {
				this.clinciDataForm.enable()
			}
		}),
		map((val) => {
			return val === 'loading'
		}),
	)

	readonly clinciDataForm = new FormGroup({
		name: new FormControl('', { validators: [Validators.required, Validators.maxLength(50)], nonNullable: true }),
		address: new FormGroup({
			street: new FormControl('', { validators: [Validators.required, Validators.maxLength(100)], nonNullable: true }),
			city: new FormControl('', { validators: [Validators.required, Validators.maxLength(50)], nonNullable: true }),
			uf: new FormControl('', { validators: [Validators.required], nonNullable: true }),
			cep: new FormControl('', { validators: [Validators.required], nonNullable: true }),
		}),
		company: new FormGroup({
			name: new FormControl('', { validators: [Validators.required, Validators.maxLength(50)], nonNullable: true }),
			cnpj: new FormControl('', { validators: [Validators.required], nonNullable: true }),
		}),
	})

	constructor(private store: Store, private clinicService: ClinicService) {
		this.clinciDataForm.patchValue(clinicService.currentClinic, { emitEvent: false })
	}

	updateClinic() {
		this.store.dispatch(updateClinic({ clinic: this.clinciDataForm.getRawValue() }))
	}

	deleteClinic() {
		this.store.dispatch(openDeleteClinicDialog({ clinic: this.clinicService.currentClinic }))
	}
}
