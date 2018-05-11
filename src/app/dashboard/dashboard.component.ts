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

  chartTitle: string = "Member Growth";
  chartType: string = "line";
  chartLegend: boolean = true;
  chartOptions = {
    responsive: true
  };
  chartData: Array<any>;
  chartLabels: Array<any>;
  chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(132, 179, 221, 0.2)',
      borderColor: '#428bca',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }
  ];

  constructor(
    private service: DashboardService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private globalNavService: GlobalNavigationService) {

    router.events.subscribe((val) => { this.determineOrganization(); });

    this.chartData = [{ data: [2, 2, 1, 2], label: 'Pull Requests last 5 Days' }];
    this.chartLabels = ['16/4/2018', '19/4/2018', '20/4/2018', '21/4/2018'];
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
