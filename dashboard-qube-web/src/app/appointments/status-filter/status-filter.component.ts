import { Component, EventEmitter, OnInit } from '@angular/core';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/appointments-form/appointment.model';
import { StatusFilterService } from './status-filter.service';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss']
})
export class StatusFilterComponent implements ClrDatagridFilterInterface<Appointment> {
  value: string = "unchecked";
  state: boolean = false;

  constructor(private filterContainer: ClrDatagridFilter, private statusFilter: StatusFilterService) {
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
        this.statusFilter.statusFilterState.emit('overdue');
        return (<any>item).status === 'Overdue';
      case 'all':
        this.statusFilter.statusFilterState.emit('all');
        return true;
      case 'upcoming':
        this.statusFilter.statusFilterState.emit('upcoming');
        return (<any>item).status === 'Upcoming';
      case 'open':
        this.statusFilter.statusFilterState.emit('open');
        return (<any>item).status === 'Open';
    }
    this.statusFilter.statusFilterState.emit('none');
    return true;
  }
  changes: any = new EventEmitter<any>(false);

  onItemChange() {
    this.state = true;
    this.changes.emit(true);
  }

}
