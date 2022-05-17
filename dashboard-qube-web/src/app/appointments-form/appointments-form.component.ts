import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  secondInterval: any;
  statusValue! : string;
  assignToValue!: string[] | null;
  endDatestartDateNotFilledError: boolean = false;

  get endDateTime() {
    return this.appointmentsDataForm.controls['endDateTime'];
  }
  get startDateTime() {
    return this.appointmentsDataForm.controls['startDateTime'];
  }
  get title() {
    return this.appointmentsDataForm.controls['title'];
  }
  get startDate() {
    return this.appointmentsDataForm.controls['startDate'];
  }
  get endDate() {
    return this.appointmentsDataForm.controls['endDate'];
  }
  get description() {
    return this.appointmentsDataForm.controls['description'];
  }
  get contactType() {
    return this.appointmentsDataForm.controls['contactType'];
  }
  get assignTo() {
    return this.appointmentsDataForm.controls['assignTo'];
  }
  get createdBy() {
    return this.appointmentsDataForm.controls['createdBy'];
  }
  get status() {
    return this.appointmentsDataForm.controls['status'];
  }

  constructor(private router: Router, private appointmentsService: AppointmentsService, private formBuilder: FormBuilder) {
    this.appointmentsDataForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      startDate: [null, [Validators.required, Validators.min(Date.now()), Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$') ]],
      startDateTime: [null, [Validators.required]],
      endDate: [null, [Validators.required, Validators.min(Date.now()), Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$'), this.checkIfStartDateisFilled]],
      endDateTime: [null, [Validators.required, this.checkIfStartTimeisFilled]],
      description: [null, [Validators.maxLength(500)]],
      contactType: [null, [Validators.required]],
      assignTo: [localStorage.getItem("isLoggedIn"), [Validators.required]],
      createdBy: [localStorage.getItem("isLoggedIn")],
      status: [null],
    });
  }

  ngOnInit(): void {
    ClarityIcons.addIcons(angleIcon);

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
          this.assignToValue = response.body;
        }
      },
      (error) => {
        console.error(error);
    }
    );

    this.secondInterval = setInterval(() => {
      this.getStatus();
    }, 1000)

    this.getCurrentDate();
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-img');
    this.errorMessage = false;
    clearInterval(this.interval);
    clearInterval(this.secondInterval);
  }

  handleSubmit(){
    if (this.appointmentsDataForm.valid)
    {
      var appointment = {
      title: this.appointmentsDataForm.controls["title"].value,
      startDate: this.appointmentsDataForm.controls["startDate"].value + " " + this.appointmentsDataForm.controls["startDateTime"].value,
      endDate: this.appointmentsDataForm.controls["endDate"].value + " " + this.appointmentsDataForm.controls["endDateTime"].value,
      description: this.appointmentsDataForm.controls["description"].value,
      contactType: this.appointmentsDataForm.controls["contactType"].value,
      assignedToUser: this.appointmentsDataForm.controls["assignTo"].value,
      createdByUser: this.appointmentsDataForm.controls["createdBy"].value,
      };

      this.appointmentsService.addAppointment(appointment).pipe(take(1)).subscribe(
        (response) => {
          if(response.status === 200){
            this.router.navigate(["/appointments"]);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  returnToAppointmentPage(){
    this.router.navigate(["/appointments"]);
  }

  checkIfStartDateisFilled(control : AbstractControl){
      const formGroup = control.parent;
      if (formGroup) {
        if(!formGroup.get("startDate")?.value){
          return {checkIfStartDateisFilled: true}
        } else {
          return null;
        }
      }
      return {checkIfStartDateisFilled: true}
  }

  checkIfStartTimeisFilled(control : AbstractControl){
    const formGroup = control.parent;
    if (formGroup) {
      if(!formGroup.get("startDateTime")?.value){
        return {checkIfStartTimeisFilled: true}
    }
  }
  return null;
}
  getStatus(){
    if(this.appointmentsDataForm.get("startDate")?.value &&
     this.appointmentsDataForm.get("endDate")?.value &&
     this.appointmentsDataForm.get("startDateTime")?.value &&
     this.appointmentsDataForm.get("endDateTime")?.value) {
        const startTime = this.appointmentsDataForm.get("startDate")?.value + " " + this.appointmentsDataForm.get("startDateTime")?.value;
        const endTime = this.appointmentsDataForm.get("endDate")?.value + " " + this.appointmentsDataForm.get("endDateTime")?.value;
        if(startTime < endTime) {
          this.statusValue = "Upcoming";
        } else {
          this.statusValue = "Overdue";
        }

     }
  }

  getCurrentDate(){
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    let newDd, newMm;
    if (dd < 10) {
      newDd = '0' + dd;
    } else{
      newDd = dd;
    }
    if (mm < 10){
      newMm = '0' + mm;
    } else {
      newMm = mm;
    }

    this.dateNow = yyyy + '-' + newMm  + '-' + newDd;
    console.log(this.dateNow)
  }
}
