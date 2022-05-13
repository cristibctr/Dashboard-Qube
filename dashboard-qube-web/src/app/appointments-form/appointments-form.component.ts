import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { angleIcon, ClarityIcons} from '@cds/core/icon';
import '@cds/core/time/register';
import { take } from 'rxjs';
import { AppointmentsService } from './appointments.service';

@Component({
  selector: 'app-appointments-form',
  templateUrl: './appointments-form.component.html',
  styleUrls: ['./appointments-form.component.scss']
})
export class AppointmentsFormComponent implements OnInit, OnDestroy {
  appointmentsDataForm!: FormGroup;
  errorMessage: boolean = false;
  dateNow!: string;
  errorText: string = "";
  interval: any;
  statusValue : string = "true";
  assignTo!: string[] | null;

  constructor(private router: Router, private appointmentsService: AppointmentsService) { }

  ngOnInit(): void {
    ClarityIcons.addIcons(angleIcon);
    document.body.classList.add('bg-img');

    if (!localStorage.getItem("isLoggedIn")) {
      this.router.navigate(['/login']);
    }
    this.interval = setInterval(() => {
      if(!localStorage.getItem("isLoggedIn")){
        this.router.navigate(["/login"]);
      }
    }, 3000);

    this.appointmentsService.getSalesPeople().pipe(take(1)).subscribe(
      (response) => {
        if(response.status === 200){
          this.assignTo = response.body;
        }
      },
      (error) => {

    }
    );

    this.appointmentsDataForm = new FormGroup({
      'title': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      'startDate': new FormControl(null, [Validators.required, Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$') ]),
      'startDateTime': new FormControl("16:00", [Validators.required]),
      'endDate': new FormControl(null, [Validators.required, Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$') ]),
      'endDateTime': new FormControl("19:00", [Validators.required]),
      'description': new FormControl(null, [Validators.maxLength(500)]),
      'contactType': new FormControl(null, [Validators.required]),
      'assignTo': new FormControl(localStorage.getItem("isLoggedIn"), [Validators.required]),
      'createdBy': new FormControl(localStorage.getItem("isLoggedIn")),
      'status': new FormControl(null),
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-img');
    this.errorMessage = false;
    clearInterval(this.interval);
  }

  getTodayDate(){
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let hh = today.getHours();
    let minMin = today.getMinutes();

    let newDd, newMm;
    if (dd < 10) newDd = '0' + dd;
    if (mm < 10) newMm = '0' + mm;

    this.dateNow = yyyy + '-' + newMm  + '-' + newDd + hh + ':' + minMin;
  }

  handleSubmit(){
    if (this.appointmentsDataForm.valid)
    {
      var appointment = Object.assign({}, this.appointmentsDataForm.value);
      delete appointment.status;
      this.appointmentsService.addAppointment(appointment).pipe(take(1)).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {

        }
      );
    }
  }
  returnToAppointmentPage(){
    this.router.navigate(["/appointments"]);
  }
}
