import { Component, EventEmitter, OnInit } from '@angular/core';
import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';

@Component({
  selector: 'app-tasks-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class TasksDateFilterComponent implements ClrDatagridFilterInterface<Task> {

  value: string = "all";
  changes: any = new EventEmitter<any>(false);

  constructor(private filterContainer: ClrDatagridFilter) {
    filterContainer.setFilter(this);
  }
  isActive(): boolean {
    return true;
  }
  accepts(item: Task): boolean {
    if((<any>item).tableDate == undefined)
      return false;
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
    this.value = event.target.value;
    console.log(this.value);
    this.changes.emit(true);
  }

}
