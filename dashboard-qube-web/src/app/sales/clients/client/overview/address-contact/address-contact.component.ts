import { Component, OnInit } from '@angular/core';
import { ClarityIcons, envelopeIcon, homeIcon, mobileIcon, popOutIcon } from '@cds/core/icon';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-address-contact-card',
  templateUrl: './address-contact.component.html',
  styleUrls: ['./address-contact.component.scss']
})
export class AddressContactComponent implements OnInit {
  address!: string;
  phoneNumber!: string;
  mail!: string;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    ClarityIcons.addIcons(envelopeIcon, homeIcon, mobileIcon, popOutIcon);
    this.clientService.dataRetrieved$.subscribe(data => {
      if (data) {
        this.address = [data.country,
          data.city, 
          data.streetName? "Str." + data.streetName:null, 
          data.number? "Nr." + data.number:null, 
          data.building? "Bl." + data.building:null, 
          data.apartment? "Ap." + data.apartment:null, 
          data.floor? "Et." + data.floor:null ].filter(Boolean).join(', ');
        this.phoneNumber = data.phoneNumber!;
        this.mail = data.email!;
      }
    });
  }

}
