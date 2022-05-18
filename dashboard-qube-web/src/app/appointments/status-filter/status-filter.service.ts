import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusFilterService {
  statusFilterState: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
}
