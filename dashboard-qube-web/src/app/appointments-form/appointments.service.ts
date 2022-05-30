import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AppConfigService } from '../app-config.service';
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  filterSelectionOrder: string[] = ['',''];
  appointmentIsCreated: boolean = false;
  statusFilterState!: string;

  constructor(private http: HttpClient) { }

  getAppointments(userEmail: string) {
    let params = new HttpParams().set("email",userEmail);
    return this.http.get<Appointment[]>(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/appointments`, {observe: 'response', responseType: 'json', params: params});
  }

  addAppointment(appointmentData: Appointment) {
    return this.http.post(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/appointments`, appointmentData, {observe: 'response', responseType: 'text'});
  }

  getSalesPeople(){
    return this.http.get<string[]>(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/users`,  {observe: 'response'})
  }

}
