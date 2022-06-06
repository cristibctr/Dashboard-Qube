import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClrDatagridSortOrder } from '@clr/angular';
import { interval, map, mergeMap, Subscription, take } from 'rxjs';
import { Appointment } from '../appointments-form/appointment.model';
import { AppointmentsService } from '../appointments-form/appointments.service';
import { AppointmentModifyService } from './appointment-modify/appointment-modify.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  host: {
    '[class.u-main-container]': 'true',
  }
})
export class AppointmentsComponent implements OnInit, OnDestroy {

  appointments!: Appointment[];
  status: string = '';
  loggedInInterval: any;
  appointmentSuccess: boolean = false;
  appointmentSuccessMessage: string = '';
  AppointmentsSubscription!: Subscription;
  ascSort = ClrDatagridSortOrder.ASC;
  showModal: boolean = false;
  modalAppointment!: Appointment;
  appointmentModifySub!: Subscription;

  constructor(private router: Router, public appointmentsService: AppointmentsService, private appointmentModifyService: AppointmentModifyService) { }

  ngOnInit(): void {
    if (!localStorage.getItem("isLoggedIn")) {
      this.router.navigate(['/login']);
    }
    this.loggedInInterval = setInterval(() => {
      if(!localStorage.getItem("isLoggedIn")){
        this.router.navigate(["/login"]);
      }
    }, 3000);
    const username: string | null = localStorage.getItem("isLoggedIn");
    this.appointmentsService.getAppointments(username!).pipe(take(1)).pipe(
      map(response => {
            let respRet = {...response};
            respRet.body = response.body!.map(appointment => ({...appointment, status: this.getAppointmentStatus(appointment), tableDate: this.getDate(appointment.startDate)}));
            return respRet;
        })
    ).subscribe(appointments => this.appointments = appointments.body!);
    this.AppointmentsSubscription = interval(5000)
    .pipe(
        mergeMap(() => this.appointmentsService.getAppointments(username!).pipe(take(1)).pipe(
          map(response => {
                let respRet = {...response};
                respRet.body = response.body!.map(appointment => ({...appointment, status: this.getAppointmentStatus(appointment), tableDate: this.getDate(appointment.startDate)}));
                return respRet;
            })
        ))
      )
    .subscribe(appointments =>{ this.appointments = appointments.body!;});

    if(this.appointmentsService.appointmentIsCreated === true){
      this.appointmentSuccess = true;
      this.appointmentSuccessMessage = 'Appointment created successfully!';
      setTimeout(() => {
        this.appointmentSuccess = false;
        this.appointmentsService.appointmentIsCreated = false;
        this.appointmentSuccessMessage = '';
      }, 2000)
    }

    this.appointmentModifySub = this.appointmentModifyService.successMessage.subscribe(value => {
      this.appointmentSuccess = true;
      this.appointmentSuccessMessage = value;
      setTimeout(() => {
        this.appointmentSuccess = false;
        this.appointmentSuccessMessage = '';
      }, 2000)
    });
  }

  getDate(date: string): Date {
    const myDate = date.split('/');
    const newDate: string = myDate[1] + '/' + myDate[0] + '/' + myDate[2];
    return new Date(Date.parse(newDate));
  }

  getAppointmentStatus(appointment: Appointment): string {
    const endDate = this.getDate(appointment.endDate);
    const startDate = this.getDate(appointment.startDate);
    const now = new Date();
    if (endDate < now) {
      return 'Overdue';
    } else if (startDate > now) {
      return 'Upcoming';
    } else {
      return 'Open';
    }
  }

  getResultsNumber(){
    if(this.appointments){
      return this.appointments.length;
    }
    return 0;
  }

  onClickAppointment(appointment: Appointment): void {
    this.modalAppointment = appointment;
    this.showModal = true;
  }

  onMessageModified(): void {
    const username: string | null = localStorage.getItem("isLoggedIn");
    this.appointmentsService.getAppointments(username!).pipe(take(1)).pipe(
      map(response => {
            let respRet = {...response};
            respRet.body = response.body!.map(appointment => ({...appointment, status: this.getAppointmentStatus(appointment), tableDate: this.getDate(appointment.startDate)}));
            return respRet;
        })
    ).subscribe(appointments => this.appointments = appointments.body!);
  }

  ngOnDestroy(): void {
    clearInterval(this.loggedInInterval);
    this.AppointmentsSubscription.unsubscribe();
    this.appointmentModifySub.unsubscribe();
  }
}
