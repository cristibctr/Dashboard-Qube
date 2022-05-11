import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userLoggedIn: EventEmitter<void> = new EventEmitter();
  emitLoggedIn() {
    this.userLoggedIn.emit();
  }
  constructor(private http: HttpClient) { }
  loginUser(loginUser: string) {
    return this.http.post(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/login`, loginUser, {observe: 'response', responseType: 'text'});
  }
}
