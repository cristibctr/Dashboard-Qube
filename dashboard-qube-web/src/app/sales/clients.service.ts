import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  getNationalities() {
    return this.http.get<{id: number, common_name: string, demonym: string}[]>(`https://api.manatal.com/open/v3/nationalities/`, {observe: 'response', responseType: 'json'});
  }
  constructor(private http: HttpClient) { }
}
