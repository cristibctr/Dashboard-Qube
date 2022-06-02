import { Component, OnInit } from '@angular/core';
import { OrganisationService } from 'src/app/organisation-form/organisation-service.service';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  appointmentSuccess: boolean = false;
  organisationSucces: boolean = false;

  constructor(private clientsService: ClientsService, private organisationsService: OrganisationService) { }

  ngOnInit(): void {
    if(this.clientsService.clientIsCreated === true){
      this.appointmentSuccess = true;
      this.clientsService.clientIsCreated = false;
      setTimeout(() => {
        this.appointmentSuccess = false;
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

}
