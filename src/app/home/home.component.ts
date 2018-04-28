import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() notifyx: EventEmitter<boolean>;
  constructor() {
    this.notifyx = new EventEmitter<boolean>();
  }


  ngOnInit() { //console.log("hey"); 
    this.notifyx.emit(false);
  }

  ngOnDestroy() {
    //console.log("rip");
    //this.notifyx.emit(true);
  }


}
