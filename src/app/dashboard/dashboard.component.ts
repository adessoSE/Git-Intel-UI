import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverModule } from "ngx-popover";

import { Organization } from '../entities/organization';

import { DashboardService } from '../services/dashboard.service';
import { GlobalNavigationService } from '../services/global-navigation.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  orga: Organization;

  constructor(
    private service: DashboardService, 
    private activeRoute: ActivatedRoute,
    private router: Router, 
    private globalNavService: GlobalNavigationService) {

    router.events.subscribe((val) => { this.determineOrganization(); });
  }

  // Display Navigation Bar if not viewing Home or Dashboard Component
  ngOnInit() {
    this.globalNavService.showNavBar(false);
  }

  ngOnDestroy() {
    this.globalNavService.showNavBar(true);
  }

  // Fetches correct organization according to URL parameter 
  determineOrganization() {
    let org = this.activeRoute.snapshot.paramMap.get('organization');
    this.orga = this.service.getOrganization(org);
  }
}
