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
import { AppointmentsDateFilterComponent } from './appointments/date-filter/date-filter.component';
import { AppointmentStatusFilterComponent } from './appointments/status-filter/status-filter.component';
import { AppointmentModifyComponent } from './appointments/appointment-modify/appointment-modify.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksDateFilterComponent } from './tasks/date-filter/date-filter.component';
import { TasksStatusFilterComponent } from './tasks/status-filter/status-filter.component';
import { ClientsComponent } from './sales/clients/clients.component';
import { OffersComponent } from './offers/offers.component';
import { OffersComponent as OffersComponentCard} from './sales/clients/client/overview/offers/offers.component';
import { TasksFormComponent } from './tasks-form/tasks-form.component';
import { TaskModifyComponent } from './tasks/task-modify/task-modify.component';
import { ClientsFormComponent } from './sales/clients-form/clients-form.component';
import { SearchTableComponent } from './sales/clients/search-table/search-table.component';
import { SearchBarComponent } from './sales/clients/search-bar/search-bar.component';
import { BoldPipe } from './sales/clients/search-table/bold.pipe';
import { OrganisationFormComponent } from './sales/organisation-form/organisation-form.component';
import { OverviewComponent } from './sales/clients/client/overview/overview.component';
import { AddressContactComponent } from './sales/clients/client/overview/address-contact/address-contact.component';
import { ClientComponent } from './sales/clients/client/client.component';
import { ClientInfoComponent } from './sales/clients/client/client-info/client-info.component';
import { OffersComponent as ClientOffersComponent } from './sales/clients/client/offers/offers.component';
import { SubnavComponent } from './sales/clients/client/subnav/subnav.component';
import { VehiclesComponent } from './sales/clients/client/vehicles/vehicles.component';






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
    AppointmentsDateFilterComponent,
    AppointmentStatusFilterComponent,
    AppointmentModifyComponent,
    TasksDateFilterComponent,
    TasksStatusFilterComponent,
    ClientsComponent,
    OffersComponent,
    TasksFormComponent,
    TaskModifyComponent,
    ClientsFormComponent,
    SearchTableComponent,
    SearchBarComponent,
    BoldPipe,
    OrganisationFormComponent,
    OverviewComponent,
    AddressContactComponent,
    ClientComponent,
    ClientInfoComponent,
    OffersComponentCard,
    VehiclesComponent,
    SubnavComponent,
    ClientOffersComponent
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
