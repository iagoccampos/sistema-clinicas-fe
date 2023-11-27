import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { catchError, throwError } from 'rxjs'
import { logout } from '../components/auth/store/auth.actions'

export const tokenExpiredInterceptor: HttpInterceptorFn = (req, next) => {
	const store = inject(Store)

	return next(req).pipe(catchError((err: HttpErrorResponse) => {
		if(err.status === 401 && err.error.auth === false) {
			store.dispatch(logout())
		}

		return throwError(() => err)
	}));
};
