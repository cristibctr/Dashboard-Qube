import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Organisation } from '../../organisation-form/organisation.model';
import { Client } from '../client.model';
import { ClientsOrgs } from './clients-orgs.model';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit, OnChanges {

  @Input() clients!: Client[];
  @Input() search!: string;
  @Input() orgs!: Organisation[];
  _clientsOrgs!: ClientsOrgs[];

  constructor() { 
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['clients'] && !changes['clients'].firstChange && changes['clients'].currentValue !== changes['clients'].previousValue)
    {
      this.clients = changes['clients'].currentValue;
    }
    if(changes['orgs'] && !changes['orgs'].firstChange && changes['orgs'].currentValue !== changes['orgs'].previousValue)
    {
      this.orgs = changes['orgs'].currentValue;
    }
    this.clientsOrgs = {clientsArg: this.clients, orgsArg: this.orgs};
  }

  ngOnInit(): void {
    this.clientsOrgs = {clientsArg: this.clients, orgsArg: this.orgs};
  }

  set clientsOrgs(clientsAndOrgArg :{clientsArg: Client[], orgsArg: Organisation[]}) {
    this._clientsOrgs = [];
    clientsAndOrgArg.clientsArg.forEach((client: Client) => {
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
    clientsAndOrgArg.orgsArg.forEach((orgs: Organisation) => {
      this._clientsOrgs.push({
        fullName: orgs.name,
        fullAddress: [orgs.country,
          orgs.city, 
          orgs.streetName? "Str." + orgs.streetName:null, 
          orgs.number? "Nr." + orgs.number:null, 
          orgs.building? "Bl." + orgs.building:null, 
          orgs.apartment? "Ap." + orgs.apartment:null, 
          orgs.floor? "Et." + orgs.floor:null ].filter(Boolean).join(', '),
        phone: orgs.phoneNumber!,
        email: orgs.email!
      });
    })
  }

}
