import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ChartJsData } from '../entities/chartJS';
import { Organization } from '../entities/organization';
import { ProcessingOrganizationInfo } from '../entities/processingOrganizationInfo';
import { CacheService } from '../services/cache.service';
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

  statusCode: number;
  error: HttpErrorResponse;
  processingInformation: ProcessingOrganizationInfo;
  progressBarPercentage: number = 0;
  initializedProcessingInterval: boolean = false;
  interval: any;

  navigationSubscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private globalNavService: GlobalNavigationService,
    private dataPullService: DataPullService,
    private cacheService: CacheService) {

    /**
     * Listens to routing events and renders the dashboard according to the active route.
     */
    this.navigationSubscription = router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.determineOrganization();
        this.initializedProcessingInterval = false;
        clearInterval(this.interval);
      }
    });
  }

  /** 
   * Disables NavigationBar while on the Dashboard. 
   */
  ngOnInit() {
    this.globalNavService.showNavBar(false);
  }

  /** 
   * Displays NavigationBar as user leaves the Dashboard.
   */
  ngOnDestroy() {
    // Unsubscribe from router events to prevent further triggering of events
    this.navigationSubscription.unsubscribe();
    this.globalNavService.showNavBar(true);
    clearInterval(this.interval);
  }

  /** 
   * Reads the URL parameter and calls @globalNavService to fetch organization data from Backend.
   */
  determineOrganization() {
    let organization = this.activeRoute.snapshot.paramMap.get('organization');
    this.cacheService.get(organization + 'Organization', this.dataPullService.requestOrganization(organization)).subscribe(data => this.processData(data), error => this.processError(error));
  }

  initRequestInterval() {
    if (!this.initializedProcessingInterval) {
      this.initializedProcessingInterval = true;
      this.interval = setInterval(() => {
        this.determineOrganization();
      }, 10000);
    }
  }

  initProgressBar() {
    var progressBarIncreasementPerFinishedRequestType: number = 100 / this.processingInformation.totalCountOfRequestTypes;
    this.progressBarPercentage = (Math.round(progressBarIncreasementPerFinishedRequestType * 10) / 10) * this.processingInformation.finishedRequestTypes.length;
  }

  processError(error: HttpErrorResponse) {
    this.statusCode = 400;
    this.error = error;
    console.log("Error Processing");
  }
  
  /**
   * 
   * @param orga 
   * TODO:
   * The naming of tabs needs to be fixed so the actual organisation's names are displayed
   * instead of the user input.
   */
  processData(orga: HttpResponse<Organization>) {
    console.log("Processing Organization!");
    switch (orga.status) {
      case 200:
        this.statusCode = 200;
        this.organization = orga.body;
        this.globalNavService.onOpenNewTabEmitter.subscribe((tab) => {
          tab.name = this.organization.name;
        });
        console.log(this.organization);
        clearInterval(this.interval);
        this.initGraphs();
        break;
      case 202:
        this.statusCode = 202;
        this.processingInformation = JSON.parse(JSON.stringify(orga.body));
        console.log(this.processingInformation)
        console.log("Accepted - 202");
        this.initRequestInterval();
        this.initProgressBar();
        break;
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
