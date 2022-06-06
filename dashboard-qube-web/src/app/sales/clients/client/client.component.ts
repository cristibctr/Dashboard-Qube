import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Client } from '../client.model';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  host: {
    '[class.u-main-container]': 'true',
  }
})
export class ClientComponent implements OnInit {
  selectedClientId!: number;
  clientName!: string;
  clientSalutation!: string;

  constructor(private clientService: ClientService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedClientId = Number(this.route.snapshot.paramMap.get('id'));
    this.clientService.getClient(this.selectedClientId).pipe(take(1)).subscribe({
      next: (client) => {
        this.clientService.addData(client.body!);
        this.clientName = client.body!.firstName + ' ' + client.body!.lastName;
        this.clientSalutation = client.body!.salutation;
      },
      error: (err) => {
        if(err.status === 404) {
          this.clientService.getOrganisation(this.selectedClientId).pipe(take(1)).subscribe({
            next: (organisation) => {
              this.clientService.addData(organisation.body!);
              this.clientName = organisation.body!.name;
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      }
    });
  }

}
