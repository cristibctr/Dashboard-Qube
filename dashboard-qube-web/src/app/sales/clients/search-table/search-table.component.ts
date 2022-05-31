import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Client } from '../client.model';
import { ClientsOrgs } from './clients-orgs.model';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit, OnChanges {

  @Input() clients!: Client[];
  _clientsOrgs!: ClientsOrgs[];

  constructor() { 
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['clients'].firstChange)
    {
      this.clients = changes['clients'].currentValue;
      this.clientsOrgs = changes['clients'].currentValue;
    }
  }

  ngOnInit(): void {
    this.clientsOrgs = this.clients;
  }

  set clientsOrgs(clientsArg: Client[]){
    this._clientsOrgs = [];
    clientsArg.forEach((client: Client) => {
      this._clientsOrgs.push({
        fullName: [client.salutation,
          client.firstName,
          client.lastName]
          .filter(Boolean).join(' '),
        fullAddress: [client.country,
           client.city, 
           client.streetName? "Str." + client.streetName:null, 
           client.number? "Nr." + client.number:null, 
           client.building? "Bl." + client.building:null, 
           client.apartment? "Ap." + client.apartment:null, 
           client.floor? "Et." + client.floor:null ].filter(Boolean).join(', '),
        phone: client.phoneNumber!,
        email: client.email!
      });
    })
  }

}
