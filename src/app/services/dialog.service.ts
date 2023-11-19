import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { DeleteConfirmationComponent, IDialogData } from '../shared/components/dialogs/delete-confirmation/delete-confirmation.component'

@Injectable({
	providedIn: 'root',
})
export class DialogService {

	constructor(private dialog: MatDialog) { }

	openDeleteConfirmationDialog(data: IDialogData) {
		return this.dialog.open<DeleteConfirmationComponent, IDialogData, boolean>(DeleteConfirmationComponent, { data	})
	}
}
