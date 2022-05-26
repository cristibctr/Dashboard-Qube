import { HttpResponse } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  nationalities!: {id: number, common_name: string, demonym: string}[];

  constructor(private formBuilder: FormBuilder, private clientsService: ClientsService) { 
    this.clientsDataForm = this.formBuilder.group({
      salutation: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('^([\\S]+[\\s-])*[\\S)]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern('^([\\S]+[\\s-])*[\\S)]+$')]],
      dateOfBirth: ['', [Validators.required, Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4}$'), this.minAgeValidator(new Date(Date.parse(this.dateNowMinus18)), new Date(Date.parse(this.dateNowMinus120))) ]],
    });
  }

  ngOnInit(): void {
    this.getAgeRange();
    this.getNationalities();
  }

  getNationalities() {
    this.clientsService.getNationalities().subscribe(
      (data: HttpResponse<{id: number, common_name: string, demonym: string}[]>) => {
        this.nationalities = data.body!;
        console.log(this.nationalities);
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
}
