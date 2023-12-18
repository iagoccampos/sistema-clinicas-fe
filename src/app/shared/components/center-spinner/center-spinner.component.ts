import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subject, takeUntil } from 'rxjs'

@Component({
	selector: 'app-center-spinner',
	template: `
		<div class="d-flex justify-content-center my-3" *ngIf="loading$ | async">
			<mat-spinner></mat-spinner>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CenterSpinnerComponent implements OnInit, OnDestroy {
	@Input({ required: true }) loading$: Observable<boolean> | null = null
	@Input() hideTarget: HTMLElement | null = null

	private currentTargetDisplay = ''

	private destroy$ = new Subject<void>()

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

	ngOnDestroy() {
		this.destroy$.next()
		this.destroy$.complete()
	}
}
