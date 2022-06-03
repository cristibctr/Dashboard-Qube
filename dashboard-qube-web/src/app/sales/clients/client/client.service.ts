import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppConfigService } from 'src/app/app-config.service';
import { Organisation } from '../../organisation-form/organisation.model';
import { Client } from '../client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private dataRetrieved: Subject<Client | Organisation | null> = new BehaviorSubject<Client | Organisation | null>(null);

  dataRetrieved$ = this.dataRetrieved.asObservable();

  addData(data: Client | Organisation) {
    this.dataRetrieved.next(data);
  }

  getClient(id: number) {
    return this.http.get<Client>(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/clients/${id}`, {observe: 'response', responseType: 'json'});
  }

  getOrganisation(id: number){
    return this.http.get<Organisation>(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/organisations/${id}`, {observe: 'response', responseType: 'json'});
  }

  constructor(private http: HttpClient) { }
}
