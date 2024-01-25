import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { createClinic } from './store/new-clinic.actions'
import { selectStatus } from './store/new-clinic.selector'
import { map, tap } from 'rxjs'
import { BaseComponent } from 'src/app/shared/components/base/base.component'

@Component({
	selector: 'app-new-clinic',
	templateUrl: './new-clinic.component.html',
	styleUrls: ['./new-clinic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewClinicComponent extends BaseComponent {
	loading$ = this.store.select(selectStatus).pipe(
		tap((val) => {
			if(val === 'loading') {
				this.clinicForm.disable()
			} else {
				this.clinicForm.enable()
			}
		}),
		map((val) => {
			return val === 'loading'
		}),
	)

	readonly clinicForm = new FormGroup({
		name: new FormControl('', { validators: [Validators.required, Validators.maxLength(50)], nonNullable: true }),
	})

	constructor(private store: Store) {
		super()
	}

	submit() {
		this.store.dispatch(createClinic({ clinicForm: this.clinicForm.getRawValue() }))
	}
}
