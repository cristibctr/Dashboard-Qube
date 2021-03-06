import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AppConfigService } from '../app-config.service';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  statusFilterState!: string;
  filterSelectionOrder: string[] = ['',''];
  taskIsCreated: boolean = false;
  successMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  getTasks(userEmail: string) {
    let params = new HttpParams().set("email",userEmail);
    return this.http.get<Task[]>(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/tasks`, {observe: 'response', responseType: 'json', params: params});
  }

  addTask(taskData: Task) {
    return this.http.post(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/tasks`, taskData, {observe: 'response', responseType: 'text'});
  }

  getSalesPeople(){
    return this.http.get<string[]>(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/users`,  {observe: 'response'})
  }

  updateTask(task: Task){
    return this.http.patch(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/task`, task, {observe: 'response', responseType: 'text'});
  }

  deleteTask(task: Task){
    return this.http.delete(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/tasks/${task.id}`, {observe: 'response', responseType: 'text'});
  }

}
