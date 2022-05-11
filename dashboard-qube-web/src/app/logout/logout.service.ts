import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  userLoggedOut : EventEmitter<void> = new EventEmitter();
  userLoggedOutEvent() {
    this.userLoggedOut.emit();
  }
  constructor() { }
}
