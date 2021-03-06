import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { Observable, Subject } from 'rxjs';
import { Appointment } from 'src/app/appointments-form/appointment.model';
import { AppointmentsService } from 'src/app/appointments-form/appointments.service';

@Component({
  selector: 'app-appointments-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class AppointmentsDateFilterComponent implements ClrDatagridFilterInterface<Appointment> {

  value: string = "all";
  changes: any = new EventEmitter<any>(false);

  constructor(private filterContainer: ClrDatagridFilter, private appointmentService: AppointmentsService) {
    filterContainer.setFilter(this);
  }
  isActive(): boolean {
    return true;
  }
  accepts(item: Appointment): boolean {
    if((<any>item).tableDate == undefined)
      return true;
    if(this.appointmentService.statusFilterState == "overdue" && this.appointmentService.filterSelectionOrder.indexOf('status') == 0)
    {
      var d = new Date();
      d.setDate(d.getDate() - 30);
      return (<any>item).tableDate > d;
    }
    var d = new Date();
    switch(this.value){
      case 't-days':
        d.setDate(d.getDate() + 29);
        return (<any>item).tableDate < d && this.getDate(item.endDate) >= new Date();
      case 's-days':
        d.setDate(d.getDate() + 6);
        return (<any>item).tableDate < d && this.getDate(item.endDate) >= new Date();
      case 'tf-hours':
        d.setHours(d.getHours() + 24);
        return (<any>item).tableDate < d && this.getDate(item.endDate) >= new Date();
      case 'all':
        d.setDate(d.getDate() - 30);
        return (<any>item).tableDate > d;
      default:
        return this.getDate(item.endDate) >= d;
    }
  }

  getDate(date: string): Date {
    const myDate = date.split('/');
    const newDate: string = myDate[1] + '/' + myDate[0] + '/' + myDate[2];
    return new Date(Date.parse(newDate));
  }

  onItemChange(event: any) {
    if(this.appointmentService.filterSelectionOrder.indexOf('date') != 1 || this.appointmentService.filterSelectionOrder.indexOf('date') == -1)
    {
      this.appointmentService.filterSelectionOrder.push('date');
      this.appointmentService.filterSelectionOrder.shift();
    }
    this.value = event.target.value;
    this.changes.emit(true);
  }

}
