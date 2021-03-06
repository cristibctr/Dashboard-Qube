import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[class.u-main-container]': 'true',
  }
})
export class HomeComponent implements OnInit, OnDestroy{
  interval: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem("isLoggedIn")) {
      this.router.navigate(['/login']);
    }
    this.interval = setInterval(() => {
      if(!localStorage.getItem("isLoggedIn")){
        this.router.navigate(["/login"]);
      }
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
