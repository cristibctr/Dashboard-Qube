import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsPageComponent } from './appointments-page/appointments-page.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

const routes: Routes = [
  {path: 'register', component: RegistrationPageComponent},
  {path: '', component: RegistrationPageComponent},
  {path:'login', component: LoginPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'appointments', component: AppointmentsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
