import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Task } from '../tasks/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskModifyService {
  successMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  updateTask(task: Task){
    return this.http.patch(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/appointment`, task, {observe: 'response', responseType: 'text'});
  }

  deleteTask(task: Task){
    return this.http.delete(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/appointments/${task.id}`, {observe: 'response', responseType: 'text'});
  }
}