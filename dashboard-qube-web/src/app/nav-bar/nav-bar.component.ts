import { Component, OnDestroy, OnInit } from '@angular/core';
import { angleIcon, ClarityIcons, userIcon } from '@cds/core/icon';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoginService } from '../login-page/login.service';
import { LogoutService } from '../logout/logout.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  subNavTypes : {[key:string]: {link: string, title: string}[] } = {
    "Sales/Clients" : [
      // {link:'/Sales',title:'Sales'},
      // {link:'/Clients',title:'Clients'}
    ],
    "Appointments & Tasks" : [
        {link:'/appointments',title:'Appointments'},
        {link:'/tasks',title:'Tasks'}
      ],
    "Reports" : []
  }
  activeSubNav = "";
  loggedIn: boolean = false;
  logoutSubscription?: Subscription;
  loginSubscription?: Subscription;

  constructor(private logoutService : LogoutService, private loginService : LoginService) { }
  
  ngOnInit(): void {
    ClarityIcons.addIcons(userIcon, angleIcon);
    if(localStorage.getItem("isLoggedIn"))
    this.loggedIn = true;
    this.logoutSubscription = this.logoutService.userLoggedOut.subscribe(() => {
      this.loggedIn = false;
    });
    this.loginSubscription = this.loginService.userLoggedIn.subscribe(() => {
      this.loggedIn = true;
    });
  }
  
  changeSubNav(subnavType: string)
  {
    this.activeSubNav = subnavType;
  }
  
  ngOnDestroy(): void {
    if(this.logoutSubscription)
      this.logoutSubscription.unsubscribe();
    if(this.loginSubscription)
      this.loginSubscription.unsubscribe();
  }
}
