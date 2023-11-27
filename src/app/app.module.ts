import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { JwtModule } from '@auth0/angular-jwt'

import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthComponent } from './components/auth/auth.component'
import { SharedModule } from './shared/shared.module'
import { AuthEffects } from './components/auth/store/auth.effects'
import { authReducer } from './components/auth/store/auth.reducer'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { tokenExpiredInterceptor } from './shared/token-expired.interceptor'

@NgModule({
	declarations: [
		AppComponent,
		AuthComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: () => localStorage.getItem('token'),
				authScheme: '',
			},
		}),
		StoreModule.forRoot({
			auth: authReducer,
		}),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: !environment.production,
		}),
		EffectsModule.forRoot([
			AuthEffects,
		]),
	],
	providers: [
		provideHttpClient(
			withInterceptors([tokenExpiredInterceptor]),
		),
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
