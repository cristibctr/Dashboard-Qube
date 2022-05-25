import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClrDatagridSortOrder } from '@clr/angular';
import { interval, map, mergeMap, Subscription, take } from 'rxjs';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {

  tasks!: Task[];
  loggedInInterval: any;
  taskSuccess: boolean = false;
  taskSuccessMessage: string = '';
  TasksSubscription!: Subscription;
  ascSort = ClrDatagridSortOrder.ASC;
  showModal: boolean = false;
  modalTask!: Task;

  constructor(private router: Router, public tasksService: TasksService) { }

  ngOnInit(): void {
    if (!localStorage.getItem("isLoggedIn")) {
      this.router.navigate(['/login']);
    }
    this.loggedInInterval = setInterval(() => {
      if(!localStorage.getItem("isLoggedIn")){
        this.router.navigate(["/login"]);
      }
    }, 3000);
    const username: string | null = localStorage.getItem("isLoggedIn");
    this.tasksService.getTasks(username!).pipe(take(1)).pipe(
      map(response => {
            let respRet = {...response};
            respRet.body = response.body!.map(task => ({...task, tableDate: this.getDate(task.dueDate), status: this.getStatus(this.getDate(task.dueDate), task.done)}));
            return respRet;
        })
    ).subscribe(tasks => this.tasks = tasks.body!);
    this.TasksSubscription = interval(5000)
    .pipe(
        mergeMap(() => this.tasksService.getTasks(username!).pipe(take(1)).pipe(
          map(response => {
                let respRet = {...response};
                respRet.body = response.body!.map(task => ({...task, tableDate: this.getDate(task.dueDate), status: this.getStatus(this.getDate(task.dueDate), task.done)}));
                return respRet;
            })
        ))
      )
    .subscribe(tasks =>{ this.tasks = tasks.body!;});

    if(this.tasksService.taskIsCreated === true){
      this.taskSuccess = true;
      this.taskSuccessMessage = 'Task created successfully!';
      setTimeout(() => {
        this.taskSuccess = false;
        this.tasksService.taskIsCreated = false;
        this.taskSuccessMessage = '';
      }, 2000)
    }
  }
  getStatus(dueDate: Date, done: boolean): any {
    if(done) {
      return 'done';
    }
    if(dueDate < new Date()) {
      return 'overdue';
    }
    return 'open';
  }

  getDate(date: string): Date {
    const myDate = date.split('/');
    const newDate: string = myDate[1] + '/' + myDate[0] + '/' + myDate[2];
    return new Date(Date.parse(newDate));
  }

  getResultsNumber(){
    if(this.tasks){
      return this.tasks.length;
    }
    return 0;
  }

  onClickTask(task: Task): void {
    this.modalTask = task;
    this.showModal = true;
  }

  onMessageModified(): void {
    const username: string | null = localStorage.getItem("isLoggedIn");
    this.tasksService.getTasks(username!).pipe(take(1)).pipe(
      map(response => {
            let respRet = {...response};
            respRet.body = response.body!.map(task => ({...task, tableDate: this.getDate(task.dueDate)}));
            return respRet;
        })
    ).subscribe(tasks => this.tasks = tasks.body!);
  }

  ngOnDestroy(): void {
    clearInterval(this.loggedInInterval);
    this.TasksSubscription.unsubscribe();
  }
}
