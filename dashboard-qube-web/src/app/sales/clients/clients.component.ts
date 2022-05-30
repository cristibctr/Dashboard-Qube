import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  appointmentSuccess: boolean = false;

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

}
