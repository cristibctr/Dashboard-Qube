import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ClientsService } from '../clients.service';
import { Client, Salutation } from './client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clientSuccess: boolean = false;
  clients: Client[] = [];
  searchDone: boolean = false;
  searchTerms!: string;

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    if(this.clientsService.clientIsCreated === true){
      this.clientSuccess = true;
      this.clientsService.clientIsCreated = false;
      setTimeout(() => {
        this.clientSuccess = false;
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
    } 
  }

}
