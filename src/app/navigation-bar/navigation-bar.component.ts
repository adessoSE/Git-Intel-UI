import { Component } from '@angular/core';
import { GlobalNavigationService } from '../services/global-navigation.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { visitAll } from '@angular/compiler';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  showNavigation: boolean = false;
  routeHistory: string[] = [];
  numOfEntities: number = 0;

  constructor(
    private globalNavService: GlobalNavigationService, 
    private location: Location, 
    private router: Router,
    private activeRoute: ActivatedRoute) {

    // Subscribe to navigation and routing services
    globalNavService.showNavBarEmitter.subscribe((mode) => { this.showNavigation = mode });
    globalNavService.numOfEntitiesEmitter.subscribe((n) => { this.numOfEntities = n });
    router.events.subscribe((val) => { this.prepareRouteHistory(location.path()) });
  }

  prepareRouteHistory(url: string) {
 
    let h: string [] = [];
    
    h = url.split("/");
    h.shift();

    for(let i = 1; i < h.length; i++) {
      h[i] = h[i-1] + "/" + h[i];
    }
    
    this.routeHistory = h;
  }

  goBack() {
    this.location.back();
  }

}