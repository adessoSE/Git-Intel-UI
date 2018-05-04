import { Component, OnInit } from '@angular/core';
import { GlobalNavigationService } from '../services/global-navigation.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  showNavigation: boolean = false;
  routeHistory: string[] = [];

  constructor(private globalNavService: GlobalNavigationService, private location: Location, private router: Router) {
    // Subscription: Show navigation?
    this.globalNavService.showNavBarEmitter.subscribe((mode) => {
      this.showNavigation = mode;
    });

    // Subscribe to routing changes
    router.events.subscribe((val) => {
      this.splitRouteString(location.path());
    });
  }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  /*
    Iterate over link, remove every "/" and seperate words
  */
  splitRouteString(link: string) {
    let h: string[] = [];
    let start = 0;

    for (let i = 0; i < link.length; i++) {
      if (link[i] === "/") {
        h.push(link.substring(start, i));
        start = i + 1;
      }
    }

    h.push( link.substring(link.lastIndexOf("/") + 1, link.length) );
    h.shift();
    this.routeHistory = h;
  }
}
