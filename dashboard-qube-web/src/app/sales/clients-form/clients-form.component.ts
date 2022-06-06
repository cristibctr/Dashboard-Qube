import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { ClientsService } from '../clients.service';
import { Client, Salutation } from '../clients/client.model';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'en-gb' }],
})
export class ClientsFormComponent implements OnInit {
  clientsDataForm: FormGroup;
  dateNowMinus18!: string;
  dateNowMinus120!: string;
  nationalities: string[] = [];
  countries: string[] = [];
  cities: string[] = [];
  countryFirst: boolean = true;
  errorMessage: string = '';

  get salutation() {
    return this.clientsDataForm.controls['salutation'];
  }
  get firstName() {
    return this.clientsDataForm.controls['firstName'];
  }
  get lastName() {
    return this.clientsDataForm.controls['lastName'];
  }
  get dateOfBirth() {
    return this.clientsDataForm.controls['dateOfBirth'];
  }
  get nationality() {
    return this.clientsDataForm.controls['nationality'];
  }
  get street() {
    return this.clientsDataForm.controls['street'];
  }
  get no() {
    return this.clientsDataForm.controls['no'];
  }
  get building() {
    return this.clientsDataForm.controls['building'];
  }
  get ap() {
    return this.clientsDataForm.controls['ap'];
  }
  get floor() {
    return this.clientsDataForm.controls['floor'];
  }
  get postalCode() {
    return this.clientsDataForm.controls['postalCode'];
  }
  get city() {
    return this.clientsDataForm.controls['city'];
  }
  get country() {
    return this.clientsDataForm.controls['country'];
  }

    constructor(private formBuilder: FormBuilder, private clientsService: ClientsService, private router: Router) {
    this.getAgeRange();
    this.clientsDataForm = this.formBuilder.group({
      salutation: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('^([\\S]+[\\s-])*[\\S)]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('^([\\S]+[\\s-])*[\\S)]+$')]],
      dateOfBirth: ['', [Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$'), this.minAgeValidator(new Date(Date.parse(this.dateNowMinus18)), new Date(Date.parse(this.dateNowMinus120))) ]],
      nationality: ['', []],
      street: ['', [Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^([\\S]+[\\s-])*[\\S)]+$')]],
      no: ['', [Validators.maxLength(10), Validators.pattern('^[\\S]+$')]],
      building: ['', [Validators.maxLength(4), Validators.pattern('^[\\S]+$')]],
      ap:  ['', [Validators.maxLength(4), Validators.pattern('^[0-9]+$')]],
      floor:  ['', [Validators.maxLength(3), Validators.pattern('^[0-9]+$')]],
      postalCode:  ['', [Validators.minLength(2), Validators.maxLength(10), Validators.pattern('^[\\S]+$')]],
      city:  ['', [Validators.minLength(2), Validators.maxLength(25)]],
      country:  ['Romania', [Validators.minLength(2), Validators.maxLength(25)]],
      email: ['', [Validators.maxLength(30), Validators.email, this.emailOrPhoneValidator, Validators.pattern("^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")]],
      phone: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^\\+?\\d+$"), this.emailOrPhoneValidator]],
    });
  }

  ngOnInit(): void {
  }

  onClose(){
    this.errorMessage = '';
  }

  getNationalities() {
    if(this.nationalities.length != 0)
      return;
    this.clientsService.getNationalities().pipe(take(1), map(
      (res: HttpResponse<{id: number, common_name: string, demonym: string}[]>) => {
        return res.body!.map(item => {
          return item.demonym;
        });
      }
    )).subscribe(
      (data: string[]) => {
        this.nationalities = data;
      }
    );
  }

  handleSubmit()
  {
    if(this.clientsDataForm.valid)
    {
      var client: Client = {
        salutation: Salutation[this.clientsDataForm.controls['salutation'].value as keyof typeof Salutation],
        firstName: this.clientsDataForm.controls['firstName'].value,
        lastName: this.clientsDataForm.controls['lastName'].value,
        dateOfBirth: this.clientsDataForm.controls['dateOfBirth'].value,
        nationality: this.clientsDataForm.controls['nationality'].value,
        streetName: this.clientsDataForm.controls['street'].value,
        number: this.clientsDataForm.controls['no'].value,
        building: this.clientsDataForm.controls['building'].value,
        apartment: this.clientsDataForm.controls['ap'].value,
        floor: this.clientsDataForm.controls['floor'].value,
        postalCode: this.clientsDataForm.controls['postalCode'].value,
        city: this.clientsDataForm.controls['city'].value,
        country: this.clientsDataForm.controls['country'].value,
        email: this.clientsDataForm.controls['email'].value,
        phoneNumber: this.clientsDataForm.controls['phone'].value
      }

      this.clientsService.addClient(client).subscribe({
        next: (data: HttpResponse<any>) => {
          this.clientsService.clientIsCreated = true;
          this.router.navigate(["/clients"]);
        },
        error: (error: HttpErrorResponse) => {
          if(error.status == 409)
            this.errorMessage = `A client with this name "${client.firstName} ${client.lastName}" and date of birth "${client.dateOfBirth}" already exists.`;
          else if(error.status == 404)
            this.errorMessage = `The client's data is invalid.`;
          else
            this.errorMessage = `An error occured.`;
        }
      });
    }
  }

  getAgeRange(){
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let newDd, newMm;
    if (dd < 10) {
      newDd = '0' + dd;
    } else{
      newDd = dd;
    }
    if (mm < 10){
      newMm = '0' + mm;
    } else {
      newMm = mm;
    }

    this.dateNowMinus18 = (yyyy - 18) + '-' + newMm  + '-' + newDd;
    this.dateNowMinus120 = (yyyy - 120) + '-' + newMm  + '-' + newDd;
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

  getCountries() {
    if(this.countries.length == 0)
      this.clientsService.getCountries().pipe(take(1), map(
        (res: HttpResponse<{id: number, common_name: string, demonym: string}[]>) => {
          return res.body!.map(item => {
            return item.common_name;
          });
        }
      )).subscribe(
        (data: string[]) => {
          this.countries = data;
        }
      );
  }

  getCities(event: any) {
    if(event == true)
    {
      const selectedCountry: string = this.clientsDataForm.get('country')?.value;
      this.clientsDataForm.get('city')?.updateValueAndValidity();
      if(selectedCountry == '' || selectedCountry == null)
        this.countryFirst = true;
      else
        this.countryFirst = false;
      if(selectedCountry != '' && selectedCountry != null && this.cities.length == 0) {
        this.clientsService.getCities(selectedCountry).pipe(take(1), map(
          (res: HttpResponse<{error: boolean, msg: string, data: string[]}>) => {
            if(res.body!.error == false && res.body!.data.length == 0)
              return [selectedCountry];
            return res.body!.data;
          }
        )).subscribe({
          next: (data: string[]) => {
            this.cities = data;
          },
          error: (error: HttpErrorResponse) => {
            this.cities = [selectedCountry];
          }
        });
      }
    }
  }

  onCountryChange(){
    this.cities = [];
    this.clientsDataForm.patchValue({
      city: ''
      });
  }

  onPhoneEmailFocus(){
    this.clientsDataForm.get('phone')?.updateValueAndValidity();
    this.clientsDataForm.get('email')?.updateValueAndValidity();
  }

  onPhoneEmailBlur(){
    this.clientsDataForm.get('phone')?.updateValueAndValidity();
    this.clientsDataForm.get('email')?.updateValueAndValidity();
  }

  emailOrPhoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const email = control.parent?.get('email');
    const phone = control.parent?.get('phone');
    if(email?.value.length != 0 || phone?.value.length != 0)
      return null;
    return { emailOrPhone: true };
  }
}
