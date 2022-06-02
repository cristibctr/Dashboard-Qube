import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../../app-config.service';
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

  searchOrganisations(searchData: string) {
    let params = new HttpParams().set("searchString", searchData);
    return this.http.get<Organisation[]>(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/organisations/search`, {params: params, observe: 'response', responseType: 'json'});
  }
}
