import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ClinicService } from 'src/app/services/clinic.service'
import { BaseComponent } from 'src/app/shared/components/base/base.component'

@Component({
	selector: 'app-clinics',
	templateUrl: './clinics.component.html',
	styleUrls: ['./clinics.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicsComponent extends BaseComponent {
	readonly getClinics$ = this.clinicService.getClinics()

	constructor(private clinicService: ClinicService) {
		super()
	}
}
