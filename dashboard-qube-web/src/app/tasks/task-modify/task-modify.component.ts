import { Component, EventEmitter, Input, LOCALE_ID, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { pencilIcon, ClarityIcons } from '@cds/core/icon';
import { take } from 'rxjs';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';
import { TaskModifyService } from './task-modify.service';

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

  constructor(private formBuilder: FormBuilder, private taskService: TasksService, private taskModifyService: TaskModifyService) {
    this.taskDataForm = this.formBuilder.group({
      title: [{value: this.task.title, disabled: !this.editable}, [Validators.required, Validators.minLength(2), Validators.maxLength(60), Validators.pattern('^([\\S]+[\\s-])*[\\S)]+$')]],
      dueDate: [{value: this.getDateAndTimeFromString(this.task.dueDate).date, disabled: !this.editable}, [Validators.required, Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$')]],
      dueDateTime: [{value: this.getDateAndTimeFromString(this.task.dueDate).time, disabled: !this.editable}, [Validators.required]],
      // endDate: [{value: this.getDateAndTimeFromString(this.task.endDate).date, disabled: !this.editable}, [this.checkIfEndDateisGreater, Validators.required, Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$')]],
      // endDateTime: [{value: this.getDateAndTimeFromString(this.task.endDate).time, disabled: !this.editable}, [Validators.required, this.checkEndDateTimeValidity]],
      description: [{value: this.task.description, disabled: !this.editable}, [Validators.maxLength(500)]],
      priority: [{value: this.task.priority, disabled: !this.editable}, [Validators.required]],
      assignTo: [{value: localStorage.getItem("isLoggedIn"), disabled: !this.editable}, [Validators.required]],
      createdBy: [this.task.createdByUser],
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
        status: (<{status: string} & Task>this.task).status
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
      this.taskModifyService.deleteTask(this.task).pipe(take(1)).subscribe(
        (response) => {
            if(response.status === 200){
              this.taskModifyService.successMessage.emit("The task has been successfully deleted.");
              this.modalIsOpen = false;
              this.messageModified.emit();
              this.modalIsOpenChange.emit(this.modalIsOpen);
          }
        }
      );
    }
  }

  onClickSave(): void {
    var changedtask = {
        id: this.task.id,
        title: this.taskDataForm.controls["title"].value,
        dueDate: this.taskDataForm.controls["dueDate"].value + " " + this.taskDataForm.controls["dueDateTime"].value,
        description: this.taskDataForm.controls["description"].value,
        priority: this.taskDataForm.controls["priority"].value,
        assignedToUser: this.taskDataForm.controls["assignTo"].value,
        createdByUser: this.taskDataForm.controls["createdBy"].value,
        done: false
      };
    if(this.task.id){
      this.taskModifyService.updateTask(changedtask).pipe(take(1)).subscribe(
        (response) => {
            if(response.status === 200){
              this.taskModifyService.successMessage.emit("The task has been successfully updated.");
              this.modalIsOpen = false;
              this.messageModified.emit();
              this.modalIsOpenChange.emit(this.modalIsOpen);
          }
        }
      );
    }
  }

  onClickOk(): void {
    console.log("OK");
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
  startDateChange(event: string){
    if(!this.taskDataForm.controls['dueDate'].touched)
      this.taskDataForm.patchValue({
        dueDate: event
      });
  }
  startDateLostFocus(){
    this.taskDataForm.controls['dueDate'].updateValueAndValidity();
  }
}
