import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  inputSearch: string = '';
  @Output() searchEvent = new EventEmitter<string>();
  myTimeout: any;

  constructor() { }

  ngOnInit(): void {
  }

  onInputChange(){
    clearTimeout(this.myTimeout);
    this.myTimeout = setTimeout(() => {
      this.searchEvent.emit(this.inputSearch);
    }, 1000);
  }

}
