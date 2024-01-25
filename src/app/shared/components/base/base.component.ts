import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core'
import { Subject } from 'rxjs'
import { TextProviderService } from 'src/app/services/text-provider.service'

@Component({
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnDestroy {
	public readonly textProvider = inject(TextProviderService)

	private readonly destroySub$ = new Subject<void>()
	protected readonly destroy$ = this.destroySub$.asObservable()

	ngOnDestroy() {
		this.destroySub$.next()
		this.destroySub$.complete()
	}
}
