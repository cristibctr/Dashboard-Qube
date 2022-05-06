import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ClarityModule} from "@clr/angular";
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AppConfigService } from './app-config.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    HomeComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AppConfigService,
  { provide: APP_INITIALIZER, useFactory: (config: AppConfigService) => () => config.load(), deps: [AppConfigService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
