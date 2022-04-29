import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  static settings: AppConfig;
  constructor(private http: HttpClient) { }
  load()
  {
    console.log(environment.name);
    const jsonFile = `assets/config/config.${environment.name}.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response) => {
               AppConfigService.settings = <AppConfig>response;
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
  }
}
