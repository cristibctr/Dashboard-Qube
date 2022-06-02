import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OrganisationService } from 'src/app/sales/organisation-form/organisation-service.service';
import { ClientsService } from '../clients.service';
import { Organisation } from '../organisation-form/organisation.model';
import { Client, Salutation } from './client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clientSuccess: boolean = false;
  clients: Client[] = [];
  orgs: Organisation[] = [];
  searchDone: boolean = false;
  searchTerms!: string;
  organisationSucces: boolean = false;

  constructor(private clientsService: ClientsService, private organisationsService: OrganisationService) { }

  ngOnInit(): void {
    if(this.clientsService.clientIsCreated === true){
      this.clientSuccess = true;
      this.clientsService.clientIsCreated = false;
      setTimeout(() => {
        this.clientSuccess = false;
      }, 2000)
    }

    if(this.organisationsService.organisationIsCreated === true){
      this.organisationSucces = true;
      this.organisationsService.organisationIsCreated = false;
      setTimeout(() => {
        this.organisationSucces = false;
      }, 2000)
    }

  }

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
