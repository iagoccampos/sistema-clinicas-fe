import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OverlayModule } from '@angular/cdk/overlay'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { PageHeaderComponent } from './components/page-header/page-header.component'
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core'

const materialModules = [
	OverlayModule,
	MatDialogModule,
	MatCardModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatIconModule,
	MatToolbarModule,
	MatSnackBarModule,
	MatCardModule,
	MatMenuModule,
	MatProgressSpinnerModule,
	MatExpansionModule,
	MatSidenavModule,
	MatListModule,
	MatDialogModule,
]

const components = [
	PageHeaderComponent,
]

@NgModule({
	declarations: [
		...components,
	],
	imports: [
		CommonModule,
	],
	exports: [
		ReactiveFormsModule,
		HttpClientModule,
		...materialModules,
		...components,
	],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
		{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
	],
})
export class SharedModule { }
