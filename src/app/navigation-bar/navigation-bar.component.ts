import { Component } from '@angular/core';
import { GlobalNavigationService } from '../services/global-navigation.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  showNavigation: boolean = false;
  routeHistory: string[] = [];
  numOfEntities: number = 0;

  constructor(private globalNavService: GlobalNavigationService, private location: Location, private router: Router) {
    // Display Navigation Bar if not viewing Home or Dashboard Component
    this.globalNavService.showNavBarEmitter.subscribe((mode) => {
      this.showNavigation = mode;
    });

    this.globalNavService.numOfEntitiesEmitter.subscribe((n) => {
      this.numOfEntities = n;
    })

    // Subscribe to routing changes
    router.events.subscribe((val) => {
      this.splitRouteString(location.path());
    });
    
  }

  goBack() {
    this.location.back();
  }

  // To improve:
  // Iterate over link, remove every "/" and seperate words
  splitRouteString(link: string) {
    // Help array h
    let h: string[] = [];
    let start = 0;

    for (let i = 0; i < link.length; i++) {
      if (link[i] === "/") {
        // Add entry before finding "/"
        h.push(link.substring(start, i));
        start = i + 1;
      }
    }

    // Add last entry and shift array to remove the empty bit
    h.push(link.substring(link.lastIndexOf("/") + 1, link.length));
    h.shift();
    
    this.routeHistory = h;
  }
}
