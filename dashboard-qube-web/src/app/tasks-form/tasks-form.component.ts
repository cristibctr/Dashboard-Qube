import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { angleIcon, ClarityIcons} from '@cds/core/icon';
import { TasksService } from '../tasks/tasks.service';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.scss'],
  host: {
    '[class.u-main-container]': 'true',
  },
  providers: [{ provide: LOCALE_ID, useValue: 'en-gb' }],
})
export class TasksFormComponent implements OnInit {
  tasksDataForm!: FormGroup;
  errorMessage: boolean = false;
  dateNow!: string;
  interval: any;
  secondInterval: any;
  statusValue! : string;
  assignToValue!: string[] | null;
  endDatestartDateNotFilledError: boolean = false;

  successMessage: boolean = false;
  checkEndDateTimeValidityValue: boolean = false;



  get title() {
    return this.tasksDataForm.controls['title'];
  }
  get dueDate() {
    return this.tasksDataForm.controls['dueDate'];
  }
  get dueDateTime() {
    return this.tasksDataForm.controls['dueDateTime'];
  }
  get description() {
    return this.tasksDataForm.controls['description'];
  }
  get priority() {
    return this.tasksDataForm.controls['priority'];
  }
  get assignTo() {
    return this.tasksDataForm.controls['assignTo'];
  }
  get createdBy() {
    return this.tasksDataForm.controls['createdBy'];
  }
  get status() {
    return this.tasksDataForm.controls['status'];
  }

  constructor(private router: Router, private tasksService: TasksService, private formBuilder: FormBuilder) {
    this.tasksDataForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(60), Validators.pattern('^([\\S]+[\\s-])*[a-zA-z]+$')]],
      dueDate: [null, [Validators.required, Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$'), this.checkDate ]],
      dueDateTime: [null, [Validators.required, this.checkValidityOfDueDateTime]],
      description: [null, [Validators.maxLength(500)]],
      priority: [null, [Validators.required]],
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

    this.tasksService.getSalesPeople().pipe(take(1)).subscribe(
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
    if (this.tasksDataForm.valid)
    {
      var task = {
      title: this.tasksDataForm.controls["title"].value,
      dueDate: this.tasksDataForm.controls["dueDate"].value + " " + this.tasksDataForm.controls["dueDateTime"].value,
      description: this.tasksDataForm.controls["description"].value,
      priority: this.tasksDataForm.controls["priority"].value,
      done: false,
      assignedToUser: this.tasksDataForm.controls["assignTo"].value,
      createdByUser: this.tasksDataForm.controls["createdBy"].value,

      };

      this.tasksService.addTask(task).pipe(take(1)).subscribe(
        (response) => {
          if(response.status === 200){
            this.tasksService.taskIsCreated = true;
            this.router.navigate(["/tasks"]);
          }
        },
        (error) => {
          console.error(error);
          this.errorMessage = true;
        }
      );
    }
  }
  returnToTasksPage(){
    this.router.navigate(["/tasks"]);
  }

checkEndDateTimeValidity(control : AbstractControl){
  const formGroup = control.parent;
  if (formGroup) {
    if(formGroup.get("startDateTime")?.value && formGroup.get("startDate")?.value && formGroup.get("endDate")?.value){
      if(formGroup.get("startDate")?.value === formGroup.get("endDate")?.value && formGroup.get("startDateTime")?.value >= control.value){
        return {checkEndDateTimeValidityValue: true}

      }
  }
}
return null;
}

  getStatus(){
    if(
     this.tasksDataForm.get("dueDateTime")?.value &&
     this.tasksDataForm.get("dueDate")?.value
     && this.tasksDataForm.get("dueDateTime")?.valid
     && this.tasksDataForm.get("dueDate")?.valid) {
        this.statusValue = "Open"

     }
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

  }


checkDate(control: AbstractControl) {

    if(control?.value){
      const dataSplit1 = control?.value.split('/');

      const day1 = dataSplit1[0];
      const month1 = dataSplit1[1];
      const year1 = dataSplit1[2];
      var data1 = new Date(year1, month1 - 1, day1);
      let date2 = new Date();
      date2.setHours(0,0,0,0)
      if(data1 < date2){
        return {invalidDate: true}
      }
    }
    return null;
  }

  onClose(){
    this.errorMessage = false;
  }
  checkValidityOfDueDateTime(control: AbstractControl){
    const formGroup = control.parent;
    if(formGroup){
      let startDateValue = formGroup.get("dueDate")?.value;

      if(control?.value && startDateValue){
        const dataSplit1 = startDateValue.split("/");
        const day1 = dataSplit1[0];
        const month1 = dataSplit1[1];
        const year1 = dataSplit1[2];


        var data1 = new Date(year1, month1 - 1, day1);
        var todayUTC = new Date(Date.UTC(data1.getFullYear(), data1.getMonth(), data1.getDate()));


        if(control?.value < new Date().toTimeString().slice(0,5) && todayUTC.toISOString().split("T")[0] === new Date().toISOString().split("T")[0]){
          return {invalidDueDate: true}
        }
      }
    }

    return null;
  }

}
