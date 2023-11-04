import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { LoginComponent } from './components/login/login.component'
import { SharedModule } from './shared/shared.module'

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
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
