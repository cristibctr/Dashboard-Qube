import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

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
    localStorage.removeItem("isLoggedIn");
    this.router.navigate(["/login"]);
  }

}
