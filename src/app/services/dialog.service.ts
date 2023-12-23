import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { DeleteConfirmationComponent, IDialogData } from '../shared/components/dialogs/delete-confirmation/delete-confirmation.component'
import { NavigationEnd, NavigationSkipped, Router } from '@angular/router'
import { filter, takeUntil } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class DialogService {

	constructor(private dialog: MatDialog, private router: Router) {
		router.events.pipe(
			filter((val) => val instanceof NavigationEnd || val instanceof NavigationSkipped),
		).subscribe(() => {
			this.closeAll()
		})
	}

	openDeleteConfirmationDialog(data: IDialogData) {
		return this.dialog.open<DeleteConfirmationComponent, IDialogData, boolean>(DeleteConfirmationComponent, { data	})
	}

	private closeAll() {
		this.dialog.closeAll()
	}
}
