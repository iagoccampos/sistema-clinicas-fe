import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { DeleteConfirmationComponent, DialogData } from '../shared/components/dialogs/delete-confirmation/delete-confirmation.component'

@Injectable({
	providedIn: 'root',
})
export class DialogService {

	constructor(private dialog: MatDialog) { }

	openDeleteConfirmationDialog(data: DialogData) {
		return this.dialog.open<DeleteConfirmationComponent, DialogData, boolean>(DeleteConfirmationComponent, { data	})
	}
}
