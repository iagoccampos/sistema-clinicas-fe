import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Observable, of, takeUntil } from 'rxjs'
import { BaseComponent } from '../base/base.component'

@Component({
	selector: 'app-center-spinner',
	template: `
		<div class="d-flex justify-content-center my-5" *ngIf="loading$ | async">
			<mat-spinner />
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CenterSpinnerComponent extends BaseComponent implements OnInit {
	@Input() loading$: Observable<boolean> | null = of(true)
	@Input() hideTarget: HTMLElement | null = null

	private currentTargetDisplay = ''

	constructor() {
		super()
	}

	ngOnInit() {
		if(this.hideTarget) {
			this.currentTargetDisplay = this.hideTarget.style.display
		}

		this.loading$?.pipe(takeUntil(this.destroy$)).subscribe((val) => {
			if(this.hideTarget) {
				this.hideTarget.style.display = val ? 'none' : this.currentTargetDisplay
			}
		})
	}
}
