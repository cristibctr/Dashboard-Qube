import { Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { RegisterService } from './register.service';



@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  registerDataForm!: FormGroup;
  errorMessage: boolean = false;
  errorText: string = "";
  dateNow!: String;

  constructor(private registration: RegisterService, private router: Router) { }

  ngOnInit(): void {
    document.body.classList.add('bg-img');

    this.getCurrentDate();

    this.registerDataForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('[a-zA-Z ]*')]),
      'lastName': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('[a-zA-Z]*')]),
      'email': new FormControl(null, [Validators.email, Validators.maxLength(30), Validators.required]),
      'password': new FormControl(null, [Validators.minLength(8), Validators.required, Validators.maxLength(25), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
      'passConfirm': new FormControl(null, [Validators.minLength(8),Validators.required, Validators.maxLength(25), this.MatchPassword]),
      'phoneNumber': new FormControl(null, [Validators.minLength(12), Validators.maxLength(13), Validators.pattern("^(00|\\+)40\\d{9}$")]),
      'dateOfBirth': new FormControl(null, [Validators.required, Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$') ]),
      'city': new FormControl(null, [Validators.minLength(2), Validators.maxLength(25), Validators.pattern('[a-zA-Z ]*')]),
      'country': new FormControl(null, [Validators.minLength(2), Validators.maxLength(25), Validators.pattern('[a-zA-Z ]*')]),
    });
  }

  getCurrentDate(){
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let newDd, newMm;
    if (dd < 10) newDd = '0' + dd;
    if (mm < 10) newMm = '0' + mm;

    this.dateNow = yyyy + '-' + newMm  + '-' + newDd;
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-img');
    this.errorMessage = false;
  }



  submitOnEnter()
  {
    if (this.registerDataForm.valid)
    {
      //copy into a new object so we can delete the password confirmation before sending it to the server
      var userForm = Object.assign({}, this.registerDataForm.value);
      delete userForm.passConfirm;
      this.registration.registerUser({...userForm, dateOfBirth: Date.parse(userForm.dateOfBirth)}).subscribe(
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
         const passwordControl = formGroup.get('password'); // to get value in input tag
         const confirmPasswordControl = formGroup.get('passConfirm'); // to get value in input tag

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

}
