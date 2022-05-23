import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AppConfigService } from 'src/app/app-config.service';
import { Appointment } from 'src/app/appointments-form/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentModifyService {
  successMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  updateAppointment(appointment: Appointment){
    return this.http.patch(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/appointment`, appointment, {observe: 'response', responseType: 'text'});
  }

  deleteAppointment(appointment: Appointment){
    return this.http.delete(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/appointments/${appointment.id}`, {observe: 'response', responseType: 'text'});
  }
}
