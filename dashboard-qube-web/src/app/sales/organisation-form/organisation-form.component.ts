import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { ClientsService } from '../clients.service';
import { OrganisationService } from './organisation-service.service';
import { Organisation } from './organisation.model';

@Component({
  selector: 'app-organisation-form',
  templateUrl: './organisation-form.component.html',
  styleUrls: ['./organisation-form.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'en-gb' }],
})
export class OrganisationFormComponent implements OnInit {
  organisationDataForm: FormGroup;
  dateNowMinus18!: string;
  dateNowMinus120!: string;
  countries: string[] = [];
  cities: string[] = [];
  countryFirst: boolean = true;
  errorMessage: string = '';

  constructor(private router: Router, private organisationService: OrganisationService, private formBuilder: FormBuilder, private clientService: ClientsService) {
    this.organisationDataForm = this.formBuilder.group({
      organisationType: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('^([a-zA-Z]+[\\s-])*[a-zA-Z]+$')]],
      contactName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('^([a-zA-Z]+[\\s-])*[a-zA-Z]+$')]],
      taxId: ['', [Validators.required, Validators.pattern('^[0-9]{6,6}$')]],
      street: ['', [Validators.minLength(2), Validators.maxLength(30)]],
      no: ['', [Validators.maxLength(10)]],
      building: ['', [Validators.maxLength(4)]],
      ap:  ['', [Validators.maxLength(4)]],
      floor:  ['', [Validators.maxLength(3)]],
      postalCode:  ['', [Validators.minLength(2), Validators.maxLength(10)]],
      city:  ['', [Validators.minLength(1), Validators.maxLength(60)]],
      country:  ['', [Validators.minLength(1), Validators.maxLength(60)]],
      email: ['', [Validators.maxLength(30), Validators.email, this.emailOrPhoneValidator, Validators.pattern("^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")]],
      phone: ['', [Validators.minLength(12), Validators.maxLength(13), Validators.pattern("^(00|\\+)40\\d{9}$"), this.emailOrPhoneValidator]],
    });
   }

  ngOnInit(): void {
  }

  onClose(){
    this.errorMessage = '';
  }

  handleSubmit(){
    if(this.organisationDataForm.valid)
    {
      var organisation: Organisation = {
        organisationType: this.organisationDataForm.controls['organisationType'].value,
        name: this.organisationDataForm.controls['name'].value,
        contactName: this.organisationDataForm.controls['contactName'].value,
        taxId: this.organisationDataForm.controls['taxId'].value,
        streetName: this.organisationDataForm.controls['street'].value,
        number: this.organisationDataForm.controls['no'].value,
        building: this.organisationDataForm.controls['building'].value,
        apartment: this.organisationDataForm.controls['ap'].value,
        floor: this.organisationDataForm.controls['floor'].value,
        postalCode: this.organisationDataForm.controls['postalCode'].value,
        city: this.organisationDataForm.controls['city'].value,
        country: this.organisationDataForm.controls['country'].value,
        email: this.organisationDataForm.controls['email'].value,
        phoneNumber: this.organisationDataForm.controls['phone'].value
      }

      this.organisationService.addOrganisation(organisation).subscribe({
        next: (data: HttpResponse<any>) => {
          this.organisationService.organisationIsCreated = true;
          this.router.navigate(["/clients"]);
        },
        error: (error: HttpErrorResponse) => {
          if(error.status == 409)
            this.errorMessage = `An organisation with Tax Id ${this.organisationDataForm.controls['taxId'].value} already exists`;
          else if(error.status == 404)
            this.errorMessage = `The organisation's data is invalid.`;
          else
            this.errorMessage = `An error occured.`;
        }
      });
    }
  }

  getCountries() {
    if(this.countries.length == 0)
      this.clientService.getCountries().pipe(take(1), map(
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
      const selectedCountry: string = this.organisationDataForm.get('country')?.value;
      this.organisationDataForm.get('city')?.updateValueAndValidity();
      if(selectedCountry == '' || selectedCountry == null)
        this.countryFirst = true;
      else
        this.countryFirst = false;
      if(selectedCountry != '' && selectedCountry != null && this.cities.length == 0) {
        this.clientService.getCities(selectedCountry).pipe(take(1), map(
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
    this.organisationDataForm.patchValue({
      city: ''
      });
  }

  onPhoneEmailFocus(){
    this.organisationDataForm.get('phone')?.updateValueAndValidity();
    this.organisationDataForm.get('email')?.updateValueAndValidity();
  }

  onPhoneEmailBlur(){
    this.organisationDataForm.get('phone')?.updateValueAndValidity();
    this.organisationDataForm.get('email')?.updateValueAndValidity();
  }

  emailOrPhoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const email = control.parent?.get('email');
    const phone = control.parent?.get('phone');
    if(email?.value.length != 0 || phone?.value.length != 0)
      return null;
    return { emailOrPhone: true };
  }

}
