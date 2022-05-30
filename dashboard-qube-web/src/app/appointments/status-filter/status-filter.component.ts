import { Component, EventEmitter, OnInit } from '@angular/core';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/appointments-form/appointment.model';
import { AppointmentsService } from 'src/app/appointments-form/appointments.service';

@Component({
  selector: 'app-appointments-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss']
})
export class AppointmentStatusFilterComponent implements ClrDatagridFilterInterface<Appointment> {
  value: string = "unchecked";

  constructor(private filterContainer: ClrDatagridFilter, private appointmentService: AppointmentsService) {
    filterContainer.setFilter(this);
}
  isActive(): boolean {
    return true;
  }
  accepts(item: Appointment): boolean {
    if((<any>item).status == undefined)
      return true;
    switch (this.value) {
      case 'overdue':
        this.appointmentService.statusFilterState = "overdue";
        return (<any>item).status === 'Overdue';
      case 'all':
        this.appointmentService.statusFilterState = "all";
        return true;
      case 'upcoming':
        this.appointmentService.statusFilterState = "upcoming";
        return (<any>item).status === 'Upcoming';
      case 'open':
        this.appointmentService.statusFilterState = "open";
        return (<any>item).status === 'Open';
      default:
        this.appointmentService.statusFilterState = "upcoming";
        return (<any>item).status === 'Open' || (<any>item).status === 'Upcoming';

    }
    return true;
  }
  changes: any = new EventEmitter<any>(false);

  onItemChange(event: any) {
    if(this.appointmentService.filterSelectionOrder.indexOf('status') != 1 || this.appointmentService.filterSelectionOrder.indexOf('status') == -1)
    {
      this.appointmentService.filterSelectionOrder.push('status');
      this.appointmentService.filterSelectionOrder.shift();
    }
    this.value = event.target.value;
    this.changes.emit(true);
  }

}
