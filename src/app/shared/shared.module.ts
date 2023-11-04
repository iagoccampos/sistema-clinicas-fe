import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OverlayModule } from '@angular/cdk/overlay'
import { MatDialogModule } from '@angular/material/dialog'

const materialModules = [
	OverlayModule,
	MatDialogModule,
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
