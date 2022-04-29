import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(registrationUser: User) {
    return this.http.post(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/users`, registrationUser, {observe: 'response'});
  }
}
