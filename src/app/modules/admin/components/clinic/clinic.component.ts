import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Clinic } from 'src/app/models/clinic.model'
import { ClinicService } from 'src/app/services/clinic.service'

@Component({
	selector: 'app-clinic',
	templateUrl: './clinic.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicComponent implements OnInit {
	@Input({ required: true }) clinicId: string | null = null

	clinic$: Observable<Clinic | null> | null = null

	constructor(private clinicService: ClinicService) {}

	ngOnInit() {
		if(this.clinicId) {
			this.clinic$ = this.clinicService.getClinic(this.clinicId)
		}
	}
}
