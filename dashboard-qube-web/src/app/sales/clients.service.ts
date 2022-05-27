import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  constructor(private http: HttpClient) { }
}
