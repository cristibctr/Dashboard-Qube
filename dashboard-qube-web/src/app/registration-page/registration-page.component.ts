import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import { RegisterService } from './register.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  registerDataForm!: FormGroup;

  constructor(private registration: RegisterService) { }

  ngOnInit(): void {
    document.body.classList.add('bg-img');
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

  ngOnDestroy(): void {
    document.body.classList.remove('bg-img');
  }

  submitOnEnter()
  {
    if (this.registerDataForm.valid)
    {
      //copy into a new object so we can delete the password confirmation before sending it to the server
      var userForm = Object.assign({}, this.registerDataForm.value);
      delete userForm.passConfirm;
      this.registration.registerUser({...userForm, dateOfBirth: Date.parse(userForm.dateOfBirth)});
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
