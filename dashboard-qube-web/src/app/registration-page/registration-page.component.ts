import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  registerDataForm!: FormGroup;

  constructor() { }

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

  }

}
