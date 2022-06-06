import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';
import { RegisterService } from '../registration-page/register.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  host: {
    '[class.u-main-container]': 'true',
  }
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginDataForm!: FormGroup;
  loginErrorMessage: boolean = false;
  usernameErrorMessage: boolean = false;

  constructor(private registration: RegisterService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

    if(localStorage.getItem("isLoggedIn")){
      this.router.navigate(['/home']);
    }
    document.getElementsByTagName("clr-main-container")[0].classList.add('bg-img');
    setTimeout(() => {
      this.registration.isRegistered.emit(false);
    }, 3000);


    this.loginDataForm = new FormGroup({
      'username': new FormControl(null, [Validators.email, Validators.maxLength(30), Validators.required, Validators.pattern("^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")]),
      'password': new FormControl(null, [Validators.minLength(8), Validators.required, Validators.maxLength(25), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{1,}$")]),

    });
  }
  ngOnDestroy(): void {
    document.getElementsByTagName("clr-main-container")[0].classList.remove('bg-img');
  }

  submitOnEnter() {

   const username = this.loginDataForm.get('username')?.value;
   const password = this.loginDataForm.get('password')?.value;
   const base64body = username + ":" +password;
   if(this.loginDataForm.valid){

    this.usernameErrorMessage = false;
    this.loginErrorMessage = false;

    this.loginService.loginUser(btoa(base64body)).pipe(take(1)).subscribe(
      (response) => {
        if(response.status === 200){
          this.loginService.emitLoggedIn();
          localStorage.setItem("isLoggedIn", username);
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        if(error.status === 401 && error.error === "User not found"){
          this.loginErrorMessage = false;
          this.usernameErrorMessage = true;

        } else if(error.status === 401 && error.error === "Incorrect password"){
          this.usernameErrorMessage = false;
          this.loginErrorMessage = true;
        }
    }
    );
   }

  }

  redirectToRegister(){
    this.router.navigate(['/register']);
  }
}
