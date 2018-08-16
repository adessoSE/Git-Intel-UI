import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartJsData } from '../entities/chartJS';
import { Organization } from '../entities/organization';
import { DataPullService } from '../services/data-pull.service';
import { GlobalNavigationService } from '../services/global-navigation.service';




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
    private activeRoute: ActivatedRoute,
    private router: Router,
    private globalNavService: GlobalNavigationService,
    private dataPullService: DataPullService) {

    /**
     * Subscribes to routing changes and fetches data to given organization.
     * Must be handled before onInit, because @orga will be undefined otherwise 
     */
    // router.events.subscribe(() => { this.determineOrganization(); });
    // console.log("Dashboard Component constructed")
  }

  /** 
   * Disables NavigationBar while on the Dashboard and requests chart data from Backend. 
   */
  ngOnInit() {
    this.determineOrganization();
    this.globalNavService.showNavBar(false)
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

    this.dataPullService.requestOrganization(org).subscribe(data => this.processData(data));
  }

  processData(orga: Organization) {
    if (orga != null) {
      this.organization = orga;
      console.log(orga);
      this.initGraphs();
    }
  }

  initGraphs() {
    this.chartCommits = {
      labels: this.organization.internalRepositoriesCommits.chartJSLabels,
      data: [{ data: this.organization.internalRepositoriesCommits.chartJSDataset, label: "Commits" }],
      caption: "Commits to internal repositories"
    };
    this.chartPRs = {
      labels: this.organization.externalRepositoriesPullRequests.chartJSLabels,
      data: [{ data: this.organization.externalRepositoriesPullRequests.chartJSDataset, label: "Pull Requests" }],
      caption: "Pull Requests to external repositories"
    };
    this.chartMembers = {
      labels: this.organization.externalRepositoriesPullRequests.chartJSLabels,
      data: [{ data: [72, 72, 73, 73, 75, 75], label: "Members" }],
      caption: "Members"
    };
  }
}
