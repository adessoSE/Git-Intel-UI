import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GlobalNavigationService } from '../services/global-navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() notifyx: EventEmitter<boolean>;
  constructor(private globalNavService: GlobalNavigationService) {
    this.notifyx = new EventEmitter<boolean>();
  }


  ngOnInit() { 
    console.log("home init"); 
    this.notifyx.emit(false);
    this.globalNavService.showNavBar(false);
  }

  ngOnDestroy() {
    console.log("home destroy");     
    this.globalNavService.showNavBar(true);
  }


}
