import { Component, EventEmitter, Input, LOCALE_ID, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { pencilIcon, ClarityIcons } from '@cds/core/icon';
import { take } from 'rxjs';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-modify',
  templateUrl: './task-modify.component.html',
  styleUrls: ['./task-modify.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'en-gb' }],
})
export class TaskModifyComponent implements OnInit {

  @Input() modalIsOpen!: boolean;
  @Output() modalIsOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() task: Task = {
    title: '',
    dueDate: '',
    description: '',
    priority: '',
    assignedToUser: '',
    createdByUser: '',
    done: false,
  };
  @Output() messageModified: EventEmitter<void> = new EventEmitter<void>();
  taskDataForm: FormGroup;
  assignToValue!: string[] | null;
  statusValue: string = "idk";
  checkEndDateTimeValidityValue: boolean = false;
  errorMessage: boolean = false;
  dateNow!: string;
  dateYesterday!: string;
  editable: boolean = false;

  get dueDateTime() {
    return this.taskDataForm.controls['dueDateTime'];
  }
  get title() {
    return this.taskDataForm.controls['title'];
  }
  get dueDate() {
    return this.taskDataForm.controls['dueDate'];
  }
  get description() {
    return this.taskDataForm.controls['description'];
  }
  get priority() {
    return this.taskDataForm.controls['priority'];
  }
  get assignTo() {
    return this.taskDataForm.controls['assignTo'];
  }
  get createdBy() {
    return this.taskDataForm.controls['createdBy'];
  }
  get status(){
    return this.taskDataForm.controls['status'];
  }
  get done(){
    return this.taskDataForm.controls['done'];
  }

  constructor(private formBuilder: FormBuilder, private taskService: TasksService) {
    this.taskDataForm = this.formBuilder.group({
      title: [{value: this.task.title, disabled: !this.editable}, [Validators.required, Validators.minLength(2), Validators.maxLength(60), Validators.pattern('^([\\S]+[\\s-])*[\\S)]+$')]],
      dueDate: [{value: this.getDateAndTimeFromString(this.task.dueDate).date, disabled: !this.editable}, [Validators.required, Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$'), this.checkDate]],
      dueDateTime: [{value: this.getDateAndTimeFromString(this.task.dueDate).time, disabled: !this.editable}, [Validators.required, this.checkValidityOfDueDateTime]],
      description: [{value: this.task.description, disabled: !this.editable}, [Validators.maxLength(500)]],
      priority: [{value: this.task.priority, disabled: !this.editable}, [Validators.required]],
      assignTo: [{value: localStorage.getItem("isLoggedIn"), disabled: !this.editable}, [Validators.required]],
      createdBy: [this.task.createdByUser],
      done: [{value: null, disabled: !this.editable}],
      status: [{value: null, disabled: !this.editable}],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['modalIsOpen'].firstChange && changes['modalIsOpen'].currentValue === true){
      this.taskDataForm.disable();
      this.taskDataForm.setValue({
        title: this.task.title,
        dueDate: this.getDateAndTimeFromString(this.task.dueDate).date,
        dueDateTime: this.getDateAndTimeFromString(this.task.dueDate).time,
        description: this.task.description,
        priority: this.task.priority,
        assignTo: localStorage.getItem("isLoggedIn"),
        createdBy: this.task.createdByUser,
        status: (<{status: string} & Task>this.task).status,
        done: this.task.done
      });
    }
  }

  ngOnInit(): void {
    ClarityIcons.addIcons(pencilIcon);
    this.getCurrentDate();
    this.taskService.getSalesPeople().pipe(take(1)).subscribe(
      (response) => {
        if(response.status === 200){
          this.assignToValue = response.body;
        }
      },
      (error) => {
        console.error(error);
    }
    );
  }

  onClickEdit(){
    if(this.editable === false){
      this.taskDataForm.enable();
    }
    else{
      this.taskDataForm.disable();
    }
    this.editable = !this.editable;
  }

  getDateAndTimeFromString(dateTime: string){
    let dateTimeArray = dateTime.split(' ');
    return {
      date: dateTimeArray[0],
      time: dateTimeArray[1]
    }
  }

  onClickCancel(): void {
    this.modalIsOpen = false;
    this.modalIsOpenChange.emit(this.modalIsOpen);
  }

  onClickDelete(): void {
    if(this.task.id){
      this.taskService.deleteTask(this.task).pipe(take(1)).subscribe(
        (response) => {
            if(response.status === 200){
              this.taskService.successMessage.emit("The task has been successfully deleted.");
              this.modalIsOpen = false;
              this.messageModified.emit();
              this.modalIsOpenChange.emit(this.modalIsOpen);
          }
        }
      );
    }
  }

  onClickSave(): void {
    if (this.taskDataForm.valid){
      var changedtask = {
        id: this.task.id,
        title: this.taskDataForm.controls["title"].value,
        dueDate: this.taskDataForm.controls["dueDate"].value + " " + this.taskDataForm.controls["dueDateTime"].value,
        description: this.taskDataForm.controls["description"].value,
        priority: this.taskDataForm.controls["priority"].value,
        assignedToUser: this.taskDataForm.controls["assignTo"].value,
        createdByUser: this.taskDataForm.controls["createdBy"].value,
        done: this.taskDataForm.controls["done"].value,
      };
    if(this.task.id){
      this.taskService.updateTask(changedtask).pipe(take(1)).subscribe(
        (response) => {
            if(response.status === 200){
              this.taskService.successMessage.emit("The task has been successfully updated.");
              this.modalIsOpen = false;
              this.messageModified.emit();
              this.modalIsOpenChange.emit(this.modalIsOpen);
          }
        }
      );
    }
    }
  }

  onClickOk(): void {
    this.modalIsOpen = false;
    this.modalIsOpenChange.emit(this.modalIsOpen);
  }

  onClickClose(): void {
    this.modalIsOpen = false;
    this.modalIsOpenChange.emit(this.modalIsOpen);
    this.taskDataForm.disable();
    this.editable = false;
    this.taskDataForm.controls['dueDate'].reset();
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
