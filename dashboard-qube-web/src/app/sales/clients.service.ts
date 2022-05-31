import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { Client } from './clients/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  clientIsCreated: boolean = false;

  getNationalities() {
    return this.http.get<{id: number, common_name: string, demonym: string}[]>(`https://api.manatal.com/open/v3/nationalities/`, {observe: 'response', responseType: 'json'});
  }

  getCountries() {
    return this.http.get<{id: number, common_name: string, demonym: string}[]>(`https://api.manatal.com/open/v3/nationalities/`, {observe: 'response', responseType: 'json'});
  }

  getCities(country: string) {
    return this.http.post<{error: boolean, msg: string, data: string[]}>(`https://countriesnow.space/api/v0.1/countries/cities`, {"country": country}, {observe: 'response', responseType: 'json'});
  }

  addClient(clientData: Client) {
    return this.http.post(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/clients`, clientData, {observe: 'response', responseType: 'text'});
  }

  searchClients(searchData: string) {
    return this.http.post<Client[]>(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/clients/search`, searchData, {observe: 'response', responseType: 'json'});
  }
  constructor(private http: HttpClient) { }
}
