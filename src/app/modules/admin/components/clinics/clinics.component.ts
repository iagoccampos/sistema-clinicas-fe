import { ChangeDetectionStrategy, Component } from '@angular/core'
import { of } from 'rxjs'
import { catchError, ignoreElements } from 'rxjs/operators'
import { ClinicService } from 'src/app/services/clinic.service'

@Component({
	selector: 'app-clinics',
	templateUrl: './clinics.component.html',
	styleUrls: ['./clinics.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicsComponent {
	readonly getClinics$ = this.clinicService.getClinics()
	readonly getClinicsError$ = this.getClinics$.pipe(ignoreElements(), catchError((err) => of(err)))

	constructor(private clinicService: ClinicService) { }
}
