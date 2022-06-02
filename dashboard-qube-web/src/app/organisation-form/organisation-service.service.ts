import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { Organisation } from './organisation.model';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  organisationIsCreated: boolean = false;

  constructor(private http: HttpClient) { }

  addOrganisation(organisationData: Organisation) {
    return this.http.post(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/organisations`, organisationData, {observe: 'response', responseType: 'text'});
  }
}
