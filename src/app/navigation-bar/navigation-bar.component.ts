import { Component, OnInit } from '@angular/core';
import { GlobalNavigationService } from '../services/global-navigation.service';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  showNavigation: boolean = false;

  constructor(private globalNavService: GlobalNavigationService) {
    this.globalNavService.showNavBarEmitter.subscribe((mode) => {

      this.showNavigation = mode;
    });
  }

  ngOnInit() {
  }

}
