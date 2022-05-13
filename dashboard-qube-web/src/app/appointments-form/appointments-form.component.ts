import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { angleIcon, ClarityIcons} from '@cds/core/icon';
import '@cds/core/time/register';

@Component({
  selector: 'app-appointments-form',
  templateUrl: './appointments-form.component.html',
  styleUrls: ['./appointments-form.component.scss']
})
export class AppointmentsFormComponent implements OnInit, OnDestroy {
  appointmentsDataForm!: FormGroup;
  errorMessage: boolean = false;
  dateNow!: string;
  errorText: string = "";
  interval: any;
  statusValue : string = "true";
  constructor(private router: Router) { }

  ngOnInit(): void {
    ClarityIcons.addIcons(angleIcon);
    document.body.classList.add('bg-img');

    if (!localStorage.getItem("isLoggedIn")) {
      this.router.navigate(['/login']);
    }
    this.interval = setInterval(() => {
      if(!localStorage.getItem("isLoggedIn")){
        this.router.navigate(["/login"]);
      }
    }, 3000);

    this.appointmentsDataForm = new FormGroup({
      'title': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      'startDate': new FormControl(null, [Validators.required, Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4} [0-2][0-9]\:[0-5][0-9]$') ]),
      'endDate': new FormControl(null, [Validators.required, Validators.pattern('^\\d{2}[\\./\\-]\\d{2}[\\./\\-]\\d{4} [0-2][0-9]\:[0-5][0-9]$') ]),
      'description': new FormControl(null, [Validators.maxLength(500)]),
      'contactType': new FormControl(null, [Validators.required]),
      'assignTo': new FormControl(localStorage.getItem("isLoggedIn"), [Validators.required]),
      'createdBy': new FormControl(localStorage.getItem("isLoggedIn")),
      'status': new FormControl(null),
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-img');
    this.errorMessage = false;
    clearInterval(this.interval);
  }

  getTodayDate(){
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let hh = today.getHours();
    let minMin = today.getMinutes();

    let newDd, newMm;
    if (dd < 10) newDd = '0' + dd;
    if (mm < 10) newMm = '0' + mm;

    this.dateNow = yyyy + '-' + newMm  + '-' + newDd + hh + ':' + minMin;
  }

  handleSubmit(){

  }
  clickOnBack(){
    this.router.navigate(["/appointments"]);
  }
}
