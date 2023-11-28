import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar'

export interface ISnackbarData {
	type: 'success' | 'error'
	msg:string
}

@Component({
	selector: 'app-snackbar',
	templateUrl: './snackbar.component.html',
	styleUrls: ['./snackbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
	constructor(private matSnackbar: MatSnackBar, @Inject(MAT_SNACK_BAR_DATA) public data: ISnackbarData) { }

	close() {
		this.matSnackbar.dismiss()
	}
}
