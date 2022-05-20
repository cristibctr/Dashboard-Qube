import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from 'src/app/app-config.service';
import { Appointment } from 'src/app/appointments-form/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentModifyService {

  constructor(private http: HttpClient) { }

  updateAppointment(appointment: Appointment){
    
  }
}
