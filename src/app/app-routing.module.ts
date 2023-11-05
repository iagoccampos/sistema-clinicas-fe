import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { isAuth } from './shared/guards/is-auth.guard'
import { isAdmin } from './shared/guards/is-admin.guard'

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/login' },
	{ path: 'login', title: 'Login', component: LoginComponent },
	{ path: 'admin', canActivate: [isAuth, isAdmin], loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule) },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
