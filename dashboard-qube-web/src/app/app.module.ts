import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ClarityModule} from "@clr/angular";
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AppConfigService } from './app-config.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import '../../node_modules/@angular/common/locales/global/en-GB.js';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { TasksComponent } from './tasks/tasks.component';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { ClrFormsModule } from '@clr/angular';
import { CdsModule } from '@cds/angular';
import { DateFilterComponent } from './appointments/date-filter/date-filter.component';
import { StatusFilterComponent } from './appointments/status-filter/status-filter.component';
import { AppointmentModifyComponent } from './appointments/appointment-modify/appointment-modify.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksFormComponent } from './tasks-form/tasks-form.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    HomeComponent,
    LogoutComponent,
    NavBarComponent,
    AppointmentsComponent,
    TasksComponent,
    AppointmentsFormComponent,
    DateFilterComponent,
    StatusFilterComponent,
    AppointmentModifyComponent,
    TasksFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClrFormsModule,
    CdsModule,
    BrowserAnimationsModule
  ],
  providers: [AppConfigService,
  { provide: APP_INITIALIZER, useFactory: (config: AppConfigService) => () => config.load(), deps: [AppConfigService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
