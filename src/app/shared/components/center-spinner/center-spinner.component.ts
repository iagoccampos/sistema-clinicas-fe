import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subject, of, takeUntil } from 'rxjs'

@Component({
	selector: 'app-center-spinner',
	template: `
		<div class="d-flex justify-content-center my-5" *ngIf="loading$ | async">
			<mat-spinner />
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CenterSpinnerComponent implements OnInit, OnDestroy {
	@Input() loading$: Observable<boolean> | null = of(true)
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
