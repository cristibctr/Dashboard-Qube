import { Component, LOCALE_ID, OnInit} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import localeEnGb from '@angular/common/locales/en-gb';

registerLocaleData(localeEnGb);

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'en-gb' }],
})
export class RegistrationPageComponent implements OnInit {
  registerDataForm!: FormGroup;
  errorMessage: boolean = false;
  errorText: string = "";
  dateNowMinus18!: string;
  dateNowMinus120!: string;

  constructor(private registration: RegisterService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("isLoggedIn") === "true"){
      this.router.navigate(['/home']);
    }

    document.body.classList.add('bg-img');

    this.getAgeRange();



    this.registerDataForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('^([a-zA-Z]+\\s)*[a-zA-Z]+$')]),
      'lastName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('[a-zA-Z]*')]),
      'email': new FormControl(null, [Validators.email, Validators.maxLength(30), Validators.required]),
      'password': new FormControl(null, [Validators.minLength(8), Validators.required, Validators.maxLength(25), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{1,}$")]),
      'passConfirm': new FormControl(null, [Validators.minLength(8),Validators.required, Validators.maxLength(25), this.MatchPassword]),
      'phoneNumber': new FormControl(null, [Validators.minLength(12), Validators.maxLength(13), Validators.pattern("^(00|\\+)40\\d{9}$")]),
      'dateOfBirth': new FormControl(null, [Validators.required, Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$'), this.minAgeValidator(new Date(Date.parse(this.dateNowMinus18)), new Date(Date.parse(this.dateNowMinus120))) ]),
      'city': new FormControl(null, [Validators.minLength(2), Validators.maxLength(25), Validators.pattern('[a-zA-Z ]*')]),
      'country': new FormControl(null, [Validators.minLength(2), Validators.maxLength(25), Validators.pattern('[a-zA-Z ]*')]),
    });
  }

  getAgeRange(){
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let newDd, newMm;
    if (dd < 10) newDd = '0' + dd;
    if (mm < 10) newMm = '0' + mm;

    this.dateNowMinus18 = (yyyy - 18) + '-' + newMm  + '-' + newDd;
    this.dateNowMinus120 = (yyyy - 120) + '-' + newMm  + '-' + newDd;
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-img');
    this.errorMessage = false;
  }



  submitOnEnter()
  {
    if (this.registerDataForm.valid)
    {
      var userForm = Object.assign({}, this.registerDataForm.value);
      delete userForm.passConfirm;
      this.registration.registerUser(userForm).subscribe(
        (response) => {
          if(response.status === 201){
            this.registration.isRegistered.emit(true);
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          this.errorMessage = true;
          if(error.status === 409){
            this.errorText = "User already exists";
          } else if(error.status === 400){
            this.errorText = "Required field missing";
          } else if(error.status === 500){
            this.errorText = "Internal server error";
          }
      }
      );
    }
  }
  MatchPassword(control : AbstractControl) {
    const formGroup = control.parent;
    if (formGroup) {
         const passwordControl = formGroup.get('password');
         const confirmPasswordControl = formGroup.get('passConfirm');

         if (passwordControl && confirmPasswordControl) {
             const password = passwordControl.value;
             const confirmPassword = confirmPasswordControl.value;
             if (password !== confirmPassword) {
                 return { matchPassword: true };
             } else {
                 return null;
             }
         }
    }

    return null;
  }

  minAgeValidator(maxDate: Date, minDate: Date) : ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const dateOfBirth = control.value;
        var parts = dateOfBirth?.split(/\/|-/);
        if(parts == undefined)
          return null;
        var dob = new Date(parseInt(parts[2], 10),
                          parseInt(parts[1], 10) - 1,
                          parseInt(parts[0], 10));
        if (dob > maxDate) {
            return { minAge: true };
        }
        if(dob < minDate)
          return { maxAge: true };
        return null;
    }
  }
}
