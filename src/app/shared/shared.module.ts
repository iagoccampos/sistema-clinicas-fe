import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OverlayModule } from '@angular/cdk/overlay'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'

const materialModules = [
	OverlayModule,
	MatDialogModule,
	MatCardModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
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
	providers: [
		{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
	],
})
export class SharedModule { }
