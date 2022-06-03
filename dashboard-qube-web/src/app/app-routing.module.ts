import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { TasksComponent } from './tasks/tasks.component';
import { ClientsComponent } from './sales/clients/clients.component';
import { TasksFormComponent } from './tasks-form/tasks-form.component';
import { ClientsFormComponent } from './sales/clients-form/clients-form.component';
import { OrganisationFormComponent } from './sales/organisation-form/organisation-form.component';

import { OffersComponent } from './offers/offers.component';
import { ClientInfoComponent } from './sales/clients/client/client-info/client-info.component';
import { ClientOffersComponent } from './sales/clients/client/client-offers/client-offers.component';
import { ClientComponent } from './sales/clients/client/client.component';
import { OverviewComponent } from './sales/clients/client/overview/overview.component';
import { VehiclesComponent } from './sales/clients/client/vehicles/vehicles.component';

const routes: Routes = [
  {path: 'register', component: RegistrationPageComponent},
  {path: '', component: RegistrationPageComponent},
  {path:'login', component: LoginPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'appointments', component: AppointmentsComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'appointments/new', component: AppointmentsFormComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'offers', component: OffersComponent},
  {path: 'tasks/new', component: TasksFormComponent},
  {path: 'appointments/new', component: AppointmentsFormComponent},
  {path: 'clients/new', component: ClientsFormComponent},
  {path: 'organisations/new', component: OrganisationFormComponent},
  {path: 'clients/:id', component: ClientComponent,

    children: [

      {path: '', redirectTo: 'overview', pathMatch: 'full'},

      {path: 'overview', component: OverviewComponent},

      {path: 'client-info', component: ClientInfoComponent},

      {path: 'vehicles', component: VehiclesComponent},

      {path: 'offers', component: ClientOffersComponent},

    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
