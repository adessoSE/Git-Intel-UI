import { Component, OnInit, Output } from '@angular/core';
import { GlobalNavigationService } from '../services/global-navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private globalNavService: GlobalNavigationService) { }

  ngOnInit() { 
    this.globalNavService.showNavBar(false);
  }

  ngOnDestroy() {   
    this.globalNavService.showNavBar(true);
  }

  openNewTab(org: string) {
    this.globalNavService.onOpenNewTab(org);
  }

}
