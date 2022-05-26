import { Component, EventEmitter, OnInit } from '@angular/core';TasksService
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss']
})
export class TasksStatusFilterComponent implements ClrDatagridFilterInterface<Task> {

  value: string = "open";

  constructor(private filterContainer: ClrDatagridFilter, private taskService: TasksService) {
    filterContainer.setFilter(this);
}
  isActive(): boolean {
    return true;
  }
  accepts(item: Task): boolean {
    if((<any>item).status == undefined)
      return false;
    if(this.value == "all")
    {
      this.taskService.statusFilterState = "all";
      return true;
    }
    this.taskService.statusFilterState = this.value;
    return (<any>item).status == this.value;
  }
  changes: any = new EventEmitter<any>(false);

  onItemChange(event: any) {
    if(this.taskService.filterSelectionOrder.indexOf('status') != 1 || this.taskService.filterSelectionOrder.indexOf('status') == -1)
    {
      this.taskService.filterSelectionOrder.push('status');
      this.taskService.filterSelectionOrder.shift();
    }
    this.value = event.target.value;
    this.changes.emit(true);
  }

}
