import { Component, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { AppointmentsService } from './appointments-form/appointments.service';
import { RegisterService } from './registration-page/register.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'dashboard-qube';
  isRegistered: boolean = false;

  constructor(private registration: RegisterService, private appointmentsService: AppointmentsService){

  }

  ngOnInit(): void {

      this.registration.isRegistered.subscribe((data: boolean) => {
        this.isRegistered = data;
      })
      setTimeout(() => {
        this.isRegistered = false;
      }, 3000);
  }
  ngOnDestroy(): void {
      this.registration.isRegistered.unsubscribe();
      setTimeout(() => {
        this.isRegistered = false;
      }, 3000);
  }
}
