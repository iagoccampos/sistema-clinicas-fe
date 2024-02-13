import { coerceBooleanProperty } from '@angular/cdk/coercion'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
	selector: 'app-page-header',
	template: `
		<hr *ngIf="!hideHr" class="my-4">
		<h2 class="my-4">{{ title }}</h2>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
	@Input({ transform: coerceBooleanProperty }) hideHr = false
	@Input({ required: true }) title = ''
}
