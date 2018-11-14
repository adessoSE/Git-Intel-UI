import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ChartJsData } from '../entities/chartJS';
import { Organization } from '../entities/organization';
import { DataPullService } from '../services/data-pull.service';
import { GlobalNavigationService } from '../services/global-navigation.service';
import { HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { ProcessingOrganizationInfo } from '../entities/processingOrganizationInfo';

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

  myStyles = {
    width: this.progressBarPercentage + "%"
  };

  navigationSubscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private globalNavService: GlobalNavigationService,
    private dataPullService: DataPullService) {

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
    // Unsubscribe from router events to prevent double triggering of events
    this.navigationSubscription.unsubscribe();
    this.globalNavService.showNavBar(true);
    clearInterval(this.interval);
  }

  /** 
   * Reads the URL parameter and calls @globalNavService to fetch organization data from Backend.
   */
  determineOrganization() {
      let org = this.activeRoute.snapshot.paramMap.get('organization');
      this.dataPullService.requestOrganization(org).subscribe(data => this.processData(data), error => this.processError(error));
  }

  initRequestInterval() {
    if (!this.initializedProcessingInterval) {
      this.initializedProcessingInterval = true;
      this.interval = setInterval( () => {
        this.dataPullService.requestOrganization(this.processingInformation.searchedOrganization.toString()).subscribe(data => this.processData(data), error => this.processError(error));
      }, 10000);
  }
}

  initProgressBar() {   
        var progressBarIncreasementPerFinishedRequestType: number = 100 / this.processingInformation.totalCountOfRequestTypes;
        this.progressBarPercentage = (Math.round(progressBarIncreasementPerFinishedRequestType * 10) / 10) * this.processingInformation.finishedRequestTypes.length;
        this.myStyles.width = this.progressBarPercentage + "%";
    }

  processError(error: HttpErrorResponse) {
    this.statusCode = 400;
    this.error = error;
    console.log("Error Processing");
  }
  
  processData(orga: HttpResponse<Organization>) {
    console.log("Processing Organization!");
    switch (orga.status) {
      case 200:
        this.statusCode = 200;
        this.organization = orga.body;
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
