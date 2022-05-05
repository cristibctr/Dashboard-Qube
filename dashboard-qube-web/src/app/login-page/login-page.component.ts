import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../registration-page/register.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginDataForm!: FormGroup;
  loginErrorMessage: boolean = true;
  usernameErrorMessage: boolean = true;

  constructor(private registration: RegisterService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    document.body.classList.add('bg-img');
    setTimeout(() => {
      this.registration.isRegistered.emit(false);
    }, 3000);

    this.loginDataForm = new FormGroup({
      'username': new FormControl(null, [Validators.email, Validators.maxLength(30), Validators.required]),
      'password': new FormControl(null, [Validators.minLength(8), Validators.required, Validators.maxLength(25), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{1,}$")]),

    });
  }
  ngOnDestroy(): void {
    document.body.classList.remove('bg-img');
  }

  submitOnEnter() {

   const username = this.loginDataForm.get('username')?.value;
   const password = this.loginDataForm.get('password')?.value;
   const base64body = username + ":" +password;
    this.loginService.loginUser(btoa(base64body)).subscribe(
      (response) => {
        if(response.status === 200){
          localStorage.setItem("isLogedIn", "true");
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        if(error.status === 409){
          this.loginErrorMessage = true;
        } else if(error.status === 400){
          this.usernameErrorMessage = true;
        }
    }
    );
  }

  redirectToRegister(){
    this.router.navigate(['/register']);
  }
}
