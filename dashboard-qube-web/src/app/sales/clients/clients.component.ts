import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { Client, Salutation } from './client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  appointmentSuccess: boolean = false;
  clients: Client[] = [];

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    if(this.clientsService.clientIsCreated === true){
      this.appointmentSuccess = true;
      this.clientsService.clientIsCreated = false;
      setTimeout(() => {
        this.appointmentSuccess = false;
      }, 2000)
    }
  }

  searchClientsOrgs(search: string){
    this.clientsService.searchClients(search).subscribe(data => {
      this.clients = data.body!;
    });
  }

}
