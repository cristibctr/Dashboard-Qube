import { Component, EventEmitter, Input, LOCALE_ID, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Appointment } from 'src/app/appointments-form/appointment.model';
import { AppointmentsService } from 'src/app/appointments-form/appointments.service';
import { pencilIcon, ClarityIcons } from '@cds/core/icon';
import { AppointmentModifyService } from './appointment-modify.service';

@Component({
  selector: 'app-appointment-modify',
  templateUrl: './appointment-modify.component.html',
  styleUrls: ['./appointment-modify.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'en-gb' }],
})
export class AppointmentModifyComponent implements OnInit, OnChanges {
  @Input() modalIsOpen!: boolean;
  @Output() modalIsOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() appointment: Appointment = {
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    contactType: '',
    assignedToUser: '',
    createdByUser: ''
  };
  @Output() messageModified: EventEmitter<void> = new EventEmitter<void>();
  appointmentsDataForm: FormGroup;
  assignToValue!: string[] | null;
  statusValue: string = "idk";
  checkEndDateTimeValidityValue: boolean = false;
  errorMessage: boolean = false;
  dateNow!: string;
  dateYesterday!: string;
  editable: boolean = false;

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

  constructor(private formBuilder: FormBuilder, private appointmentsService: AppointmentsService, private appointmentModifyService: AppointmentModifyService) { 
    this.appointmentsDataForm = this.formBuilder.group({
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
      this.appointmentsDataForm.disable();
      this.appointmentsDataForm.setValue({
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
      this.appointmentsDataForm.enable();
    }
    else{
      this.appointmentsDataForm.disable();
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
              this.appointmentModifyService.successMessage.emit("Appointment deleted successfully");
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
        title: this.appointmentsDataForm.controls["title"].value,
        startDate: this.appointmentsDataForm.controls["startDate"].value + " " + this.appointmentsDataForm.controls["startDateTime"].value,
        endDate: this.appointmentsDataForm.controls["endDate"].value + " " + this.appointmentsDataForm.controls["endDateTime"].value,
        description: this.appointmentsDataForm.controls["description"].value,
        contactType: this.appointmentsDataForm.controls["contactType"].value,
        assignedToUser: this.appointmentsDataForm.controls["assignTo"].value,
        createdByUser: this.appointmentsDataForm.controls["createdBy"].value,
      };
    if(this.appointment.id){
      this.appointmentModifyService.updateAppointment(changedAppointment).pipe(take(1)).subscribe(
        (response) => {
            if(response.status === 200){
              this.appointmentModifyService.successMessage.emit("Appointment modified successfully");
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
    this.appointmentsDataForm.disable();
    this.editable = false;
    this.appointmentsDataForm.controls['endDate'].reset();
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
    if(!this.appointmentsDataForm.controls['endDate'].touched)
      this.appointmentsDataForm.patchValue({
        endDate: event
      });
  }
  startDateLostFocus(){
    this.appointmentsDataForm.controls['endDate'].updateValueAndValidity();
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
}
