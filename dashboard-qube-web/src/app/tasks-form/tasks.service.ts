import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { Task } from '../tasks/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  taskIsCreated: boolean = false;

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
}
