import { Component, OnInit } from '@angular/core';
import { ClarityIcons, envelopeIcon, homeIcon, mobileIcon, popOutIcon } from '@cds/core/icon';

@Component({
  selector: 'app-offers-card',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    ClarityIcons.addIcons(envelopeIcon, homeIcon, mobileIcon, popOutIcon);
  }

}
