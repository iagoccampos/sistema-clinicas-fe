import { LOCALE_ID, NgModule } from '@angular/core'
import { CommonModule, registerLocaleData } from '@angular/common'
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
import { HttpClientModule } from '@angular/common/http'
import { PageHeaderComponent } from './components/page-header/page-header.component'
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core'
import { MatTableModule } from '@angular/material/table'
import { MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator'
import { MatDateFnsModule, DateFnsAdapter } from '@angular/material-date-fns-adapter'
import { ptBR } from 'date-fns/esm/locale'
import localePT from '@angular/common/locales/pt'
import { InputMaskModule } from '@ngneat/input-mask'
import { CurrencyMaskModule } from 'ng2-currency-mask'
import { OrDashPipe } from './pipes/or-dash.pipe'
import { DeleteConfirmationComponent } from './components/dialogs/delete-confirmation/delete-confirmation.component'
import { MaskDirective } from './directives/mask.directive'
import { CurrencyMaskDirective } from './directives/currencyMask.directive'
import { RgPipe } from './pipes/rg.pipe'
import { CpfPipe } from './pipes/cpf.pipe'
import { PhonePipe } from './pipes/phone.pipe'
import { SnackbarComponent } from './components/snackbar/snackbar.component'
import { MatSelectModule } from '@angular/material/select'

registerLocaleData(localePT)

const materialModules = [
	OverlayModule,
	MatDialogModule,
	MatCardModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatDatepickerModule,
	MatDateFnsModule,
	MatSelectModule,
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
	MatTableModule,
	MatPaginatorModule,
]

const components = [
	PageHeaderComponent,
	DeleteConfirmationComponent,
	SnackbarComponent,
]

const pipes = [
	OrDashPipe,
	RgPipe,
	CpfPipe,
	PhonePipe,
]

const directives = [
	MaskDirective,
	CurrencyMaskDirective,
]

@NgModule({
	declarations: [
		...components,
		...pipes,
		...directives,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		HttpClientModule,
		InputMaskModule,
		CurrencyMaskModule,
		...materialModules,
	],
	exports: [
		ReactiveFormsModule,
		HttpClientModule,
		InputMaskModule,
		CurrencyMaskModule,
		...materialModules,
		...components,
		...pipes,
		...directives,
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'pt-br' },
		{ provide: MAT_DATE_LOCALE, useValue: ptBR },
		{ provide: DateAdapter, useClass: DateFnsAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
		{
			provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: {
				pageSizeOptions: [10, 25, 100], showFirstLastButtons: true, formFieldAppearance: 'outline',
			},
		},
		{
			provide: MatPaginatorIntl,
			useValue: (() => {
				const paginatorIntl = new MatPaginatorIntl()
				paginatorIntl.itemsPerPageLabel = 'Itens por página:'
				paginatorIntl.firstPageLabel = 'Primeira página'
				paginatorIntl.previousPageLabel = 'Página anterior'
				paginatorIntl.nextPageLabel = 'Próxima página'
				paginatorIntl.lastPageLabel = 'Última página'
				paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
					if(length === 0 || pageSize === 0) {
						return `0 de ${length}`
					}

					length = Math.max(length, 0)

					const startIndex = page * pageSize

					const endIndex = startIndex < length ?
						Math.min(startIndex + pageSize, length) :
						startIndex + pageSize

					return `${startIndex + 1} - ${endIndex} de ${length}`
				}

				return paginatorIntl
			})(),
		},
	],
})
export class SharedModule { }
