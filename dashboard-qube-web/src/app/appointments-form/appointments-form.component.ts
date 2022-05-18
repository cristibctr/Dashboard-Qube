import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { angleIcon, ClarityIcons} from '@cds/core/icon';
import '@cds/core/time/register';
import { take } from 'rxjs';
import { AppointmentsService } from './appointments.service';

@Component({
  selector: 'app-appointments-form',
  templateUrl: './appointments-form.component.html',
  styleUrls: ['./appointments-form.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'en-gb' }],
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
  dateYesterday!: string;
  successMessage: boolean = false;
  checkEndDateTimeValidityValue: boolean = false;

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
      startDate: [null, [Validators.required, this.dateValidator(new Date(Date.parse(this.dateYesterday))), Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$') ]],
      startDateTime: [null, [Validators.required]],
      endDate: [null, [Validators.required, this.checkIfEndDateisGreater, Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$'), this.checkIfStartDateisFilled]],
      endDateTime: [null, [Validators.required, this.checkIfStartTimeisFilled, this.checkEndDateTimeValidity]],
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

  startDateChange(event: string){
    if(!this.appointmentsDataForm.controls['endDate'].touched)
      this.appointmentsDataForm.patchValue({
        endDate: event
      });
  }

  startDateLostFocus(){
    this.appointmentsDataForm.controls['endDate'].updateValueAndValidity();
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
            this.successMessage = true;
            this.router.navigate(["/appointments"]);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else{
      this.errorMessage = true;
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

checkEndDateTimeValidity(control : AbstractControl){
  const formGroup = control.parent;
  if (formGroup) {
    if(formGroup.get("startDateTime")?.value && formGroup.get("startDate")?.value && formGroup.get("endDate")?.value){
      if(formGroup.get("startDate")?.value === formGroup.get("endDate")?.value && formGroup.get("startDateTime")?.value === control.value){
        return {checkEndDateTimeValidityValue: true}

      }
  }
}
return null;
}

parseDates(){
  const dataSplit1 = this.appointmentsDataForm.get("startDate")?.value.split('/');
  const timeSplit1 = this.appointmentsDataForm.get("startDateTime")?.value.split(':');

  const day1 = dataSplit1[0];
  const month1 = dataSplit1[1];
  const year1 = dataSplit1[2];
  const hour1 = timeSplit1[0];
  const minutes1 = timeSplit1[1];

  const dataSplit2 = this.appointmentsDataForm.get("endDate")?.value.split('/');
  const timeSplit2 = this.appointmentsDataForm.get("endDateTime")?.value.split(':');

  const day2 = dataSplit2[0];
  const month2 = dataSplit2[1];
  const year2 = dataSplit2[2];
  const hour2 = timeSplit2[0];
  const minutes2 = timeSplit2[1]


  var data1 = new Date(year1, month1 - 1, day1, hour1, minutes1);
  var data2 = new Date(year2, month2 - 1, day2, hour2, minutes2);
  return {data1, data2};
}

  getStatus(){
    if(this.appointmentsDataForm.get("startDate")?.value &&
     this.appointmentsDataForm.get("endDate")?.value &&
     this.appointmentsDataForm.get("startDateTime")?.value &&
     this.appointmentsDataForm.get("endDateTime")?.value) {

      const dataSplit1 = this.appointmentsDataForm.get("startDate")?.value.split('/');
      const timeSplit1 = this.appointmentsDataForm.get("startDateTime")?.value.split(':');

      const day1 = dataSplit1[0];
      const month1 = dataSplit1[1];
      const year1 = dataSplit1[2];
      const hour1 = timeSplit1[0];
      const minutes1 = timeSplit1[1];

      const dataSplit2 = this.appointmentsDataForm.get("endDate")?.value.split('/');
      const timeSplit2 = this.appointmentsDataForm.get("endDateTime")?.value.split(':');

      const day2 = dataSplit2[0];
      const month2 = dataSplit2[1];
      const year2 = dataSplit2[2];
      const hour2 = timeSplit2[0];
      const minutes2 = timeSplit2[1]


      var data1 = new Date(year1, month1 - 1, day1, hour1, minutes1);
      var data2 = new Date(year2, month2 - 1, day2, hour2, minutes2);

        if(Date.now() >= data1.getTime() && Date.now() < data2.getTime()){
          this.statusValue = "Open";
        }
        if(Date.now() < data1.getTime()){
          this.statusValue = "Upcoming";
        }
        if(Date.now() >= data2.getTime()){
          this.statusValue = "Overdue";
        }

        // if (data1.getTime() === data2.getTime()) {
        //   this.statusValue = "Open";
        // }
        // else if (data1.getTime() < data2.getTime()) {
        //   this.statusValue = "Upcoming";
        // }
        // else {
        //   this.statusValue = "Overdue";
        // }

     }
  }

  checkIfEndDateisGreater(control : AbstractControl){
    const formGroup = control.parent;
    if (formGroup) {
      if(formGroup.get("startDate")?.value && formGroup.get("endDate")?.value){

        const dataSplit1 = formGroup.get("startDate")?.value.split('/');

        const day1 = dataSplit1[0];
        const month1 = dataSplit1[1];
        const year1 = dataSplit1[2];

        const dataSplit2 = formGroup.get("endDate")?.value.split('/');

        const day2 = dataSplit2[0];
        const month2 = dataSplit2[1];
        const year2 = dataSplit2[2];


        var data1 = new Date(year1, month1 - 1, day1);
        var data2 = new Date(year2, month2 - 1, day2);



        if(data2.getTime() < data1.getTime()){
          return {checkIfEndDateisGreater: true}
        }
      }
    }
    return null;
}
  getCurrentDate(){
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let yesterdayDD;
    let newDd, newMm;
    if (dd < 10) {
      newDd = '0' + dd;
      yesterdayDD = '0' + (dd - 1);
    } else{
      newDd = dd;
      yesterdayDD = dd -1;
    }
    if (mm < 10){
      newMm = '0' + mm;
    } else {
      newMm = mm;
    }

    this.dateNow = yyyy + '-' + newMm  + '-' + newDd;

    this.dateYesterday = yyyy + '-' + newMm  + '-' + yesterdayDD;
  }
  dateValidator( minDate: Date) : ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const inputDate = control.value;
        var parts = inputDate?.split(/\/|-/);
        if(parts == undefined)
          return null;
        var currentDate = new Date(parseInt(parts[2], 10),
                          parseInt(parts[1], 10) - 1,
                          parseInt(parts[0], 10));
        if(currentDate < minDate)
          return { dateValidatorError: true };
        return null;
    }
  }
  checkValidDate(control: AbstractControl){
    const dateSplit = control.value?.split('/');
    if(dateSplit !== undefined){


    const day = dateSplit[0];
    const month = dateSplit[1];
    const year = dateSplit[2];

    if(month > 12){
      return {wrongDate: true}
    }

    if(month === "01" && month === "03" && month === "05" && month === "07" && month === "08" && month === "10" && month === "12"){
      if(day > 31){
        return {wrongDate: true}
      }
    } else if(month === "04" && month === "06" && month === "09" && month === "11"){
      if(day > 30){
        return {wrongDate: true}
      }
    } else if(month ==="02"){
      if((year % 4 === 0 && year % 100 !== 0) || year%400 === 0){
        if(day > 29){
          return {wrongDate: true}
        }
      }else{
        if(day > 28){
          return {wrongDate: true}
        }
      }
    }
  }
    return null;
}


}
