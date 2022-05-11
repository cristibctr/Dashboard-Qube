import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from './logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private logoutService: LogoutService) { }

  ngOnInit(): void {

  }

  isLoggedIn() {
    if (localStorage.getItem("isLoggedIn")) {
      return true;
    }
    return false;
  }

 logout() {
   if(this.isLoggedIn())
   {
    localStorage.removeItem("isLoggedIn");
    this.logoutService.userLoggedOutEvent();
    this.router.navigate(["/login"]);
   }
  }

}
