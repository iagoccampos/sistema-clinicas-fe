import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { openDeleteClinicDialog } from './store/config.actions'
import { ClinicService } from 'src/app/services/clinic.service'

@Component({
	selector: 'app-config',
	templateUrl: './config.component.html',
	styleUrls: ['./config.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigComponent {

	constructor(private store: Store, private clinicService: ClinicService) {}

	deleteClinic() {
		this.store.dispatch(openDeleteClinicDialog({ clinic: this.clinicService.currentClinic }))
	}
}
