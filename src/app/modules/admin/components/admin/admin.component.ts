import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-admin',
	template: `
		<app-navbar></app-navbar>
		<div class="container-fluid">
			<router-outlet></router-outlet>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {

	constructor() { }
}
