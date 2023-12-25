import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ClinicService } from 'src/app/services/clinic.service'

@Component({
	selector: 'app-clinics',
	templateUrl: './clinics.component.html',
	styleUrls: ['./clinics.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicsComponent {
	readonly getClinics$ = this.clinicService.getClinics()

	constructor(private clinicService: ClinicService) { }
}
