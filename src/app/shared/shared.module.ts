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
import { MatSelectModule } from '@angular/material/select'
import { MatListModule } from '@angular/material/list'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { PageHeaderComponent } from './components/page-header/page-header.component'
import { DateAdapter, ErrorStateMatcher, MAT_DATE_LOCALE, ShowOnDirtyErrorStateMatcher } from '@angular/material/core'
import { MatTableModule } from '@angular/material/table'
import { MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator'
import { MatDateFnsModule, DateFnsAdapter } from '@angular/material-date-fns-adapter'
import { ptBR } from 'date-fns/esm/locale'
import localePT from '@angular/common/locales/pt'
import { InputMaskModule } from '@ngneat/input-mask'
import { CurrencyMaskModule } from 'ng2-currency-mask'
import { PushPipe } from '@ngrx/component'
import { OrDashPipe } from './pipes/or-dash.pipe'
import { DeleteConfirmationComponent } from './components/dialogs/delete-confirmation/delete-confirmation.component'
import { MaskDirective } from './directives/mask.directive'
import { CurrencyMaskDirective } from './directives/currencyMask.directive'
import { RgPipe } from './pipes/rg.pipe'
import { CpfPipe } from './pipes/cpf.pipe'
import { PhonePipe } from './pipes/phone.pipe'
import { SnackbarComponent } from './components/snackbar/snackbar.component'
import { CenterSpinnerComponent } from './components/center-spinner/center-spinner.component'
import { ButtonLoadingDirective } from './directives/mat-button-loading.directive'
import { InputComponent } from './components/input/input.component'

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
	CenterSpinnerComponent,
	InputComponent,
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
	ButtonLoadingDirective,
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
		PushPipe,
		...materialModules,
	],
	exports: [
		ReactiveFormsModule,
		HttpClientModule,
		InputMaskModule,
		CurrencyMaskModule,
		PushPipe,
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
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		{
			provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useValue: {
				pageSizeOptions: [10, 25, 100], showFirstLastButtons: true, formFieldAppearance: 'outline',
			},
		},
		{
			provide: MatPaginatorIntl,
			useValue: (() => {
				const paginatorIntl = new MatPaginatorIntl()
				paginatorIntl.itemsPerPageLabel = $localize `Itens por página:`
				paginatorIntl.firstPageLabel = $localize `Primeira página`
				paginatorIntl.previousPageLabel = $localize `Página anterior`
				paginatorIntl.nextPageLabel = $localize `Próxima página`
				paginatorIntl.lastPageLabel = $localize `Última página`
				paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
					if(length === 0 || pageSize === 0) {
						return $localize `0 de ${length}`
					}

					length = Math.max(length, 0)

					const startIndex = page * pageSize

					const endIndex = startIndex < length ?
						Math.min(startIndex + pageSize, length) :
						startIndex + pageSize

					return $localize `${startIndex + 1} - ${endIndex} de ${length}`
				}

				return paginatorIntl
			})(),
		},
	],
})
export class SharedModule { }
