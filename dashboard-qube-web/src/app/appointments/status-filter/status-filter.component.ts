import { Component, EventEmitter, OnInit } from '@angular/core';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/appointments-form/appointment.model';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss']
})
export class StatusFilterComponent implements ClrDatagridFilterInterface<Appointment> {
  value: string = "unchecked";
  state: boolean = false;

  constructor(private filterContainer: ClrDatagridFilter) {
    filterContainer.setFilter(this);
}
  isActive(): boolean {
    return this.state;
  }
  accepts(item: Appointment): boolean {
    if((<any>item).status == undefined)
      return true;
    switch (this.value) {
      case 'overdue':
        return (<any>item).status === 'Overdue';
      case 'all':
        return true;
      case 'upcoming':
        return (<any>item).status === 'Upcoming';
      case 'open':
        return (<any>item).status === 'Open';
    }
    return true;
  }
  changes: any = new EventEmitter<any>(false);

  onItemChange() {
    this.state = true;
    this.changes.emit(true);
  }

}
