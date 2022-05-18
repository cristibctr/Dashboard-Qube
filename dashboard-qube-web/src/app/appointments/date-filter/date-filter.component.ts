import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { Observable, Subject } from 'rxjs';
import { Appointment } from 'src/app/appointments-form/appointment.model';
import { StatusFilterService } from '../status-filter/status-filter.service';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements ClrDatagridFilterInterface<Appointment> {

  value: string = "unchecked";
  changes: any = new EventEmitter<any>(false);
  statusFilterState!: string;

  constructor(private filterContainer: ClrDatagridFilter, private statusFilter: StatusFilterService) {
    filterContainer.setFilter(this);
    statusFilter.statusFilterState.subscribe(status => this.statusFilterState = status);
  }
  isActive(): boolean {
    return true;
  }
  accepts(item: Appointment): boolean {
    if((<any>item).tableDate == undefined)
      return true;
    var d = new Date();
    if(this.statusFilterState == 'overdue') {
      d.setDate(d.getDate() - 30);
      return (<any>item).tableDate > d;
    }
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

  onItemChange() {
    this.changes.emit(true);
  }

}
