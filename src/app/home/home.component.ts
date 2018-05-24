import { Component, OnInit, Output } from '@angular/core';
import { GlobalNavigationService } from '../services/global-navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private globalNavService: GlobalNavigationService) { }

  /* 
   * Disables NavigationBar while on HomeComponent. 
   */
  ngOnInit() {
    this.globalNavService.showNavBar(false);
  }

  /*
   * Displays NavigationBar as user leaves the HomeComponent.
   */
  ngOnDestroy() {
    this.globalNavService.showNavBar(true);
  }

  /*
   * Requests the @globalNavService to open a new Tab for given organization.
   */
  openNewTab(org: string) {
    this.globalNavService.onOpenNewTab(org);
  }

}
