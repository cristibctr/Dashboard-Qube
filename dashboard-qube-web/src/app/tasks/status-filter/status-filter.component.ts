import { Component, EventEmitter, OnInit } from '@angular/core';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';

@Component({
  selector: 'app-tasks-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss']
})
export class TasksStatusFilterComponent implements ClrDatagridFilterInterface<Task> {

  value: string = "open";

  constructor(private filterContainer: ClrDatagridFilter) {
    filterContainer.setFilter(this);
}
  isActive(): boolean {
    return true;
  }
  accepts(item: Task): boolean {
    if((<any>item).status == undefined)
      return false;
    if(this.value == "all")
      return true;
    return (<any>item).status == this.value;
  }
  changes: any = new EventEmitter<any>(false);

  onItemChange(event: any) {
    this.value = event.target.value;
    this.changes.emit(true);
  }

}
