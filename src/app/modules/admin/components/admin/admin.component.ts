import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-admin',
	template: `
		<app-navbar />
		<router-outlet />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {

	constructor() { }
}
