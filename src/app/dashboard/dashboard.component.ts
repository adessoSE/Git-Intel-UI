import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverModule } from "ngx-popover";

import { Organization } from '../entities/organization';

import { DashboardService } from '../services/dashboard.service';
import { GlobalNavigationService } from '../services/global-navigation.service';
import { CHARTJS_DEFAULT } from '../mock-data';
import { ChartJs } from '../entities/chartJS';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  orga: Organization;
  chartMembers: ChartJs = CHARTJS_DEFAULT;
  chartCommits: ChartJs = CHARTJS_DEFAULT;
  chartPRs: ChartJs = CHARTJS_DEFAULT;

  constructor(
    private service: DashboardService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private globalNavService: GlobalNavigationService) {

    /**
     * Subscribes to routing changes and fetches data to given organization.
     * Must be handled before onInit, because @orga will be undefined otherwise 
     */
    router.events.subscribe((val) => { this.determineOrganization(); });
  }

  /** 
   * Disables NavigationBar while on the Dashboard and requests chart data from Backend. 
   */
  ngOnInit() {
    this.globalNavService.showNavBar(false);
  }

  /** 
   * Displays NavigationBar as user leaves the Dashboard.
   */
  ngOnDestroy() {
    this.globalNavService.showNavBar(true);
  }

  /** 
   * Reads the URL parameter and calls @globalNavService to fetch organization data from Backend.
   */
  determineOrganization() {
    let org = this.activeRoute.snapshot.paramMap.get('organization');
    this.orga = this.service.getOrganization(org);
    
    this.chartMembers.chartContent = this.orga.internalRepositories; // To change
    this.chartCommits.chartContent = this.orga.internalRepositories
    this.chartPRs.chartContent = this.orga.externalRepositories;
  }
}
