import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  subNavTypes : {[key:string]: {link: string, title: string}[]} = {
    "SalesClients" : [
      {link:'/Sales',title:'Sales'},
      {link:'/Clients',title:'Clients'}
    ],
    "AppointmentsAndTasks" : [
      {link:'/Appointments',title:'Appointments'},
      {link:'/Tasks',title:'Tasks'}
    ],
    "Reports" : []
  }
  navs : {link: string, title: string}[] = []
  constructor() { }

  ngOnInit(): void {
  }

  changeSubNav(subnavType: string)
  {
    this.navs = this.subNavTypes[subnavType];
  }

}
