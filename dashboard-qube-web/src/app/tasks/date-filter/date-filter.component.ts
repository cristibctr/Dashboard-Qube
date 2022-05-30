import { Component, EventEmitter, OnInit } from '@angular/core';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class TasksDateFilterComponent implements ClrDatagridFilterInterface<Task> {

  value: string = "all";
  changes: any = new EventEmitter<any>(false);

  constructor(private filterContainer: ClrDatagridFilter, private taskService: TasksService) {
    filterContainer.setFilter(this);
  }
  isActive(): boolean {
    return true;
  }
  accepts(item: Task): boolean {
    if((<any>item).tableDate == undefined)
      return false;
    if((this.taskService.statusFilterState == "overdue" && this.taskService.filterSelectionOrder.indexOf('status') == 0) ||
    (this.taskService.statusFilterState == "done" && this.taskService.filterSelectionOrder.indexOf('status') == 0))
    {
      var d = new Date();
      d.setDate(d.getDate() - 30);
      return (<any>item).tableDate > d;
    }
    var d = new Date();
    switch(this.value){
      case 't-days':
        d.setDate(d.getDate() + 29);
        return (<any>item).tableDate < d && (<any>item).tableDate >= new Date();
      case 's-days':
        d.setDate(d.getDate() + 6);
        return (<any>item).tableDate < d && (<any>item).tableDate >= new Date();
      case 'tf-hours':
        d.setHours(d.getHours() + 24);
        return (<any>item).tableDate < d && (<any>item).tableDate >= new Date();
      case 'all':
        d.setDate(d.getDate() - 30);
        return (<any>item).tableDate > d;
      default:
        return (<any>item).tableDate >= d;
    }
  }

  onItemChange(event: any) {
    if(this.taskService.filterSelectionOrder.indexOf('date') != 1 || this.taskService.filterSelectionOrder.indexOf('date') == -1)
    {
      this.taskService.filterSelectionOrder.push('date');
      this.taskService.filterSelectionOrder.shift();
    }
    this.value = event.target.value;
    this.changes.emit(true);
  }

}
