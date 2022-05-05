import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterService } from '../registration-page/register.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  constructor(private registration: RegisterService) { }

  ngOnInit(): void {
    document.body.classList.add('bg-img');
    setTimeout(() => {
      this.registration.isRegistered.emit(false);
    }, 3000);
  }
  ngOnDestroy(): void {
    document.body.classList.remove('bg-img');
  }

}
