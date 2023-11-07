import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './components/login/login.component'
import { SharedModule } from './shared/shared.module';
import { authReducer } from './auth-store/auth.reducer';
import { AuthEffects } from './auth-store/auth.effects'
import { JwtModule } from '@auth0/angular-jwt'

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		SharedModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: () => localStorage.getItem('token'),
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
	bootstrap: [AppComponent],
})
export class AppModule { }
