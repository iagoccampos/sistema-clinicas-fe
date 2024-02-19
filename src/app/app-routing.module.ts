import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { AuthComponent } from './components/auth/auth.component'
import { isAuth } from './shared/guards/is-auth.guard'
import { isAdmin } from './shared/guards/is-admin.guard'
import { isNotAuth } from './shared/guards/is-not-auth.guard'

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/login' },
	{ path: 'login', title: 'Login', component: AuthComponent, canActivate: [isNotAuth] },
	{ path: 'admin', canActivate: [isAuth, isAdmin], canActivateChild: [isAuth, isAdmin], loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule) },
]

@NgModule({
	imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true, preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule { }
