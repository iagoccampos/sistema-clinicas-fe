import { Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { ISnackbarData, SnackbarComponent } from '../shared/components/snackbar/snackbar.component'

@Injectable({
	providedIn: 'root',
})
export class SnackbarService {

	private readonly config: MatSnackBarConfig = {
		horizontalPosition: 'right', verticalPosition: 'top',
	} as const

	constructor(private snackBar: MatSnackBar) { }

	error(msg: string) {
		this.snackBar.openFromComponent<SnackbarComponent, ISnackbarData>(SnackbarComponent, {
			...this.config,
			duration: this.calculateTime(msg),
			data: { msg: msg, type: 'error' },
			panelClass: ['snackbar', 'error'],
		})
	}

	success(msg: string) {
		this.snackBar.openFromComponent<SnackbarComponent, ISnackbarData>(SnackbarComponent, {
			...this.config,
			duration: this.calculateTime(msg),
			data: { msg, type: 'success' },
			panelClass: ['snackbar', 'success'],
		})
	}

	private calculateTime(msg: string) {
		return msg.split(' ').length * 0.8 * 1000
	}
}
