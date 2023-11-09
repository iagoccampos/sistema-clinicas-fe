import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ClinicService } from "src/app/services/clinic.service"
import { ActivatedRoute, Router } from "@angular/router"
import { catchError, map, of, switchMap, tap } from "rxjs"
import { createClinic, createClinicError, createClinicSuccess } from "./new-clinic.actions"
import { SnackbarService } from "src/app/services/snackbar.service"

@Injectable()
export class NewClinicEffects {
	private readonly newClinic = createEffect(() => {
		return this.actions$.pipe(
			ofType(createClinic),
			switchMap((val) => {
				return this.clinicService.addClinic(val.clinicForm).pipe(
					map((res) => {
						return createClinicSuccess({ clinic: res })
					}),
					catchError((err) => {
						return of(createClinicError({ error: { errorMsg: err.error.message } }))
					}),
				)
			}),
		)
	})

	private newClinicError = createEffect(() => {
		return this.actions$.pipe(
			ofType(createClinicError),
			tap((val) => {
				this.snackbarService.error(`Erro ao cria a clínica: ${val.error.errorMsg}`)
			}),
		)
	}, { dispatch: false })

	private newClinicSuccess = createEffect(() => {
		return this.actions$.pipe(
			ofType(createClinicSuccess),
			tap((val) => {
				this.snackbarService.error(`Clínica "${val.clinic.name}" criada com sucesso.`)
				this.router.navigate(['clinica', val.clinic._id], { relativeTo: this.route })
			}),
		)
	}, { dispatch: false })

	constructor(
		private actions$: Actions,
		private clinicService: ClinicService,
		private snackbarService: SnackbarService,
		private router: Router,
		private route: ActivatedRoute) {}
}
