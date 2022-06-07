import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { Client } from './clients/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

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
    let params = new HttpParams().set("searchString", searchData);
    return this.http.get<Client[]>(`http://${AppConfigService.settings.apiEndpoint}:${AppConfigService.settings.apiPort}/api/clients/search`, {params: params,observe: 'response', responseType: 'json'});
  }
  constructor(private http: HttpClient) { }
}
