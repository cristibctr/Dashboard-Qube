import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OrganisationService } from 'src/app/sales/organisation-form/organisation-service.service';
import { ClientsService } from '../clients.service';
import { Organisation } from '../organisation-form/organisation.model';
import { Client, Salutation } from './client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  host: {
    '[class.u-main-container]': 'true',
  }
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  orgs: Organisation[] = [];
  searchDone: boolean = false;
  searchTerms!: string;

  constructor(private clientsService: ClientsService, private organisationsService: OrganisationService) { }

  ngOnInit(): void { }

  searchClientsOrgs(search: string){
    this.searchTerms = search;
    if(search.length > 0){
      this.searchDone = true;
      this.clientsService.searchClients(search).pipe(take(1)).subscribe(data => {
        this.clients = data.body!;
      });
      this.organisationsService.searchOrganisations(search).pipe(take(1)).subscribe(data => {
        this.orgs = data.body!;
      });
    } 
  }

}
