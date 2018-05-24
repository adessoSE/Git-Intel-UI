import { Component, OnInit, Output } from '@angular/core';
import { GlobalNavigationService } from '../services/global-navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchHistory: Set<string> = new Set<string>();

  constructor(private globalNavService: GlobalNavigationService) { }

  /* 
   * Disables NavigationBar while on HomeComponent
   * and saves entries of searched organization in a Set,
   * since multiple entries are unnecessary. 
   */
  ngOnInit() {
    this.searchHistory.add("adessoAG");   // Dummy data
    this.searchHistory.add("microsoft");  // Dummy data
    
    this.globalNavService.showNavBar(false);

    this.globalNavService.onOpenNewTabEmitter.subscribe((tab) => {
      if (tab !== null) this.searchHistory.add(tab.org);
    })
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
