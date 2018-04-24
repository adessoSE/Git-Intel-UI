import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any;

  constructor() {
    // ==========TEST DATA=========
    this.data = {
      name: 'Business Company Ltd.',
      id: 'MDEyOk9yZ2FuaXphdGlvbjE3MTA0MjI=',
      location: 'Example City',
      websiteURL: 'http://adesso.de',
      githubURL: 'https://github.com/adessoAG',
      description: 'This is a description of our company.',
      membersAmount: 6,
      teamsAmount: 3,
      repositoriesAmount: 3,
      externalRepositoriesAmount: 379,
      externalRepositoriesChartJSData:
        {
          externalRepoActivityDays: ['16/4/2018', '19/4/2018', '20/4/2018', '21/4/2018'],
          externalRepoActivityAmount: [2, 2, 1, 2]
        }
    };
    // ============================
  }

  ngOnInit() {
  }

}
