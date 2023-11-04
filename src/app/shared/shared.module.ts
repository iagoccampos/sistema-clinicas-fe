import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OverlayModule } from '@angular/cdk/overlay'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'

const materialModules = [
	OverlayModule,
	MatDialogModule,
	MatCardModule,
	MatFormFieldModule,
	MatIconModule,
]

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
	],
	exports: [
		...materialModules,
	],
})
export class SharedModule { }
