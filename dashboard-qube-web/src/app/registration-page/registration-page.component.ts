import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from './user.model';
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
      'firstName': new FormControl(null, [ Validators.required ]),
      'lastName': new FormControl(null),
      'email': new FormControl(null),
      'password': new FormControl(null),
      'passConfirm': new FormControl(null),
      'phoneNumber': new FormControl(null),
      'dateOfBirth': new FormControl(null),
      'city': new FormControl(null),
      'country': new FormControl(null),
    });
  }
  
  ngOnDestroy(): void {
    document.body.classList.remove('bg-img');
  }

  submitOnEnter()
  {
    if (this.registerDataForm.valid)
      this.registration.registerUser({...this.registerDataForm.value, dateOfBirth: Date.parse(this.registerDataForm.value.dateOfBirth)});
  }

}
