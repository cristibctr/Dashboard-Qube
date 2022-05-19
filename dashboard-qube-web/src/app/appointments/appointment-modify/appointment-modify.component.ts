import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/appointments-form/appointment.model';

@Component({
  selector: 'app-appointment-modify',
  templateUrl: './appointment-modify.component.html',
  styleUrls: ['./appointment-modify.component.scss']
})
export class AppointmentModifyComponent implements OnInit {
  @Input() modalIsOpen!: boolean;
  @Output() modalIsOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() appointment!: Appointment;
  constructor() { }

  ngOnInit(): void {
  }

  onClickCancel(): void {
    this.modalIsOpen = false;
    this.modalIsOpenChange.emit(this.modalIsOpen);
  }

  onClickOk(): void {
    this.modalIsOpen = false;
    this.modalIsOpenChange.emit(this.modalIsOpen);
  }

  onClickXOrBackdrop(): void {
    this.modalIsOpen = false;
    this.modalIsOpenChange.emit(this.modalIsOpen);
  }

}
