import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverModule } from "ngx-popover";

import { Organization } from '../entities/organization';

import { DashboardService } from '../services/dashboard.service';
import { GlobalNavigationService } from '../services/global-navigation.service';
import { CHARTJS_DEFAULT } from '../mock-data';
import { ChartJs, ChartJsData } from '../entities/chartJS';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  organization: Organization;
  chartMembers: ChartJsData;
  chartCommits: ChartJsData;
  chartPRs: ChartJsData;

  constructor(
    private service: DashboardService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private globalNavService: GlobalNavigationService) {

    /**
     * Subscribes to routing changes and fetches data to given organization.
     * Must be handled before onInit, because @orga will be undefined otherwise 
     */
    router.events.subscribe(() => { this.determineOrganization(); });
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
    this.organization = this.service.getOrganization(org);

    this.chartMembers = this.organization.memberGrowth;
    this.chartCommits = this.organization.internalRepositories
    this.chartPRs = this.organization.externalRepositories;
  }
}
