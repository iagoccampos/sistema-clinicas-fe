import { Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'

@Injectable({
	providedIn: 'root',
})
export class SnackbarService {

	private readonly config: MatSnackBarConfig = {
		horizontalPosition: 'right', verticalPosition: 'top', duration: 5000,
	} as const

	constructor(private snackBar: MatSnackBar) { }

	success(msg: string) {
		this.snackBar.open(msg, '', this.config)
	}

	error(msg: string) {
		this.snackBar.open(msg, '', this.config)
	}
}
