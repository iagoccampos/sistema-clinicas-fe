import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
	selector: 'app-center-spinner',
	template: `
		<div class="d-flex justify-content-center my-3" *ngIf="loading$ | async">
			<mat-spinner></mat-spinner>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CenterSpinnerComponent {
	@Input({ required: true }) loading$: Observable<boolean> | null = null
}
