import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { TasksComponent } from './tasks/tasks.component';
import { ClientsComponent } from './sales/clients/clients.component';
import { OffersComponent } from './sales/offers/offers.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
