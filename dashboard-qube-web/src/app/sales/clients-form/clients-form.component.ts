import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { map, take } from 'rxjs';
import { ClientsService } from '../clients.service';

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

  constructor(private formBuilder: FormBuilder, private clientsService: ClientsService) { 
    this.clientsDataForm = this.formBuilder.group({
      salutation: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('^([\\S]+[\\s-])*[\\S)]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('^([\\S]+[\\s-])*[\\S)]+$')]],
      dateOfBirth: ['', [Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$'), this.minAgeValidator(new Date(Date.parse(this.dateNowMinus18)), new Date(Date.parse(this.dateNowMinus120))) ]],
      nationality: ['', []],
      street: ['', []],
      no: ['', []],
      building: ['', []],
      ap:  ['', []],
      floor:  ['', []],
      postalCode:  ['', []],
      city:  ['', []],
      country:  ['', []],
      email: ['', [Validators.email, this.emailOrPhoneValidator, Validators.pattern("^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")]],
      phone: ['', [Validators.minLength(12), Validators.maxLength(13), Validators.pattern("^(00|\\+)40\\d{9}$"), this.emailOrPhoneValidator]],
    });
  }

  ngOnInit(): void {
    this.getAgeRange();
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
    console.log(this.clientsDataForm);
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
    console.log(email?.value);
    console.log(phone?.value);
    if(email?.value.length != 0 || phone?.value.length != 0)
      return null;
    return { emailOrPhone: true };
  }
}
