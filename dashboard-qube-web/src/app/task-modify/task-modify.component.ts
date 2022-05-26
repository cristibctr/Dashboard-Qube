import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { pencilIcon } from '@cds/core/icon';
import { ClarityIcons } from '@clr/icons';
import { take } from 'rxjs';
import { TasksService } from '../tasks/tasks.service';
import { TaskModifyService } from './task-modify.service';

@Component({
  selector: 'app-task-modify',
  templateUrl: './task-modify.component.html',
  styleUrls: ['./task-modify.component.scss']
})
export class TaskModifyComponent implements OnInit {

  @Input() modalIsOpen!: boolean;
  @Output() modalIsOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() task: Task = {
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    contactType: '',
    assignedToUser: '',
    createdByUser: ''
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

  get endDateTime() {
    return this.taskDataForm.controls['endDateTime'];
  }
  get startDateTime() {
    return this.taskDataForm.controls['startDateTime'];
  }
  get title() {
    return this.taskDataForm.controls['title'];
  }
  get startDate() {
    return this.taskDataForm.controls['startDate'];
  }
  get endDate() {
    return this.taskDataForm.controls['endDate'];
  }
  get description() {
    return this.taskDataForm.controls['description'];
  }
  get contactType() {
    return this.taskDataForm.controls['contactType'];
  }
  get assignTo() {
    return this.taskDataForm.controls['assignTo'];
  }
  get createdBy() {
    return this.taskDataForm.controls['createdBy'];
  }
  get status() {
    return this.taskDataForm.controls['status'];
  }

  constructor(private formBuilder: FormBuilder, private taskService: TasksService, private taskModifyService: TaskModifyService) {
    this.taskDataForm = this.formBuilder.group({
      title: [{value: this.appointment.title, disabled: !this.editable}, [Validators.required, Validators.minLength(2), Validators.maxLength(60), Validators.pattern('^([\\S]+[\\s-])*[\\S)]+$')]],
      startDate: [{value: this.getDateAndTimeFromString(this.appointment.startDate).date, disabled: !this.editable}, [Validators.required, Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$')]],
      startDateTime: [{value: this.getDateAndTimeFromString(this.appointment.startDate).time, disabled: !this.editable}, [Validators.required]],
      endDate: [{value: this.getDateAndTimeFromString(this.appointment.endDate).date, disabled: !this.editable}, [this.checkIfEndDateisGreater, Validators.required, Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$')]],
      endDateTime: [{value: this.getDateAndTimeFromString(this.appointment.endDate).time, disabled: !this.editable}, [Validators.required, this.checkEndDateTimeValidity]],
      description: [{value: this.appointment.description, disabled: !this.editable}, [Validators.maxLength(500)]],
      contactType: [{value: this.appointment.contactType, disabled: !this.editable}, [Validators.required]],
      assignTo: [{value: localStorage.getItem("isLoggedIn"), disabled: !this.editable}, [Validators.required]],
      createdBy: [this.appointment.createdByUser],
      status: [{value: null, disabled: !this.editable}],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['modalIsOpen'].firstChange && changes['modalIsOpen'].currentValue === true){
      this.taskDataForm.disable();
      this.taskDataForm.setValue({
        title: this.appointment.title,
        startDate: this.getDateAndTimeFromString(this.appointment.startDate).date,
        startDateTime: this.getDateAndTimeFromString(this.appointment.startDate).time,
        endDate: this.getDateAndTimeFromString(this.appointment.endDate).date,
        endDateTime: this.getDateAndTimeFromString(this.appointment.endDate).time,
        description: this.appointment.description,
        contactType: this.appointment.contactType,
        assignTo: localStorage.getItem("isLoggedIn"),
        createdBy: this.appointment.createdByUser,
        status: (<{status: string} & Appointment>this.appointment).status
      });
    }
  }

  ngOnInit(): void {
    ClarityIcons.addIcons(pencilIcon);
    this.getCurrentDate();
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
    if(this.appointment.id){
      this.appointmentModifyService.deleteAppointment(this.appointment).pipe(take(1)).subscribe(
        (response) => {
            if(response.status === 200){
              this.appointmentModifyService.successMessage.emit("The appointment has been successfully deleted.");
              this.modalIsOpen = false;
              this.messageModified.emit();
              this.modalIsOpenChange.emit(this.modalIsOpen);
          }
        }
      );
    }
  }

  onClickSave(): void {
    var changedAppointment = {
        id: this.appointment.id,
        title: this.taskDataForm.controls["title"].value,
        startDate: this.taskDataForm.controls["startDate"].value + " " + this.taskDataForm.controls["startDateTime"].value,
        endDate: this.taskDataForm.controls["endDate"].value + " " + this.taskDataForm.controls["endDateTime"].value,
        description: this.taskDataForm.controls["description"].value,
        contactType: this.taskDataForm.controls["contactType"].value,
        assignedToUser: this.taskDataForm.controls["assignTo"].value,
        createdByUser: this.taskDataForm.controls["createdBy"].value,
      };
    if(this.appointment.id){
      this.appointmentModifyService.updateAppointment(changedAppointment).pipe(take(1)).subscribe(
        (response) => {
            if(response.status === 200){
              this.appointmentModifyService.successMessage.emit("The appointment has been successfully updated.");
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
    this.taskDataForm.controls['endDate'].reset();
  }
}
