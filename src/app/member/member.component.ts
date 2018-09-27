import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartJsData } from '../entities/chartJS';
import { Member } from '../entities/member';
import { DataPullService } from '../services/data-pull.service';
import { GlobalNavigationService } from '../services/global-navigation.service';
import { TableDataObject } from '../entities/tableDataObject';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  member: Member;
  chartCommits: ChartJsData;
  chartPRs: ChartJsData;
  chartIssues: ChartJsData;

  commitsTableData: TableDataObject[] = [];
  pullRequestsTableData: TableDataObject[] = [];
  issuesTableData: TableDataObject[] = [];

  constructor(
    private dataPullService: DataPullService,
    private activeRoute: ActivatedRoute,
    private navService: GlobalNavigationService) {

    // Set the number of "entities" displayed in the breadcrumbs to 0 so they are disabled in navigation-bar.component.html.
    this.navService.tellNumOfEntities(0);
    this.determineMember();
  }

  ngOnInit() {
    // this.initGraphs();
  }

  determineMember() {
    let member = this.activeRoute.snapshot.paramMap.get('username');
    this.findMemberByName(member);
  }

  findMemberByName(username: string) {
    let organization = this.activeRoute.snapshot.paramMap.get('organization');
    this.dataPullService.requestMembers(organization).subscribe(data => {
      for (let member of data) {
        if (member.username === username) {
          this.member = member;
        }
      }
      this.initGraphs();
      this.processTableData();
    });
  }

  initGraphs() {
    this.chartCommits = {
      labels: this.member.previousCommits.chartJSLabels,
      data: [{ data: this.member.previousCommits.chartJSDataset, label: "Commits" }],
      caption: "Latest commits"
    };
    this.chartPRs = {
      labels: this.member.previousPullRequests.chartJSLabels,
      data: [{ data: this.member.previousPullRequests.chartJSDataset, label: "Pull Requests" }],
      caption: "Latest Pull Requests"
    };
    this.chartIssues = {
      labels: this.member.previousIssues.chartJSLabels,
      data: [{ data: this.member.previousIssues.chartJSDataset, label: "Issues" }],
      caption: "Latest Issues"
    };
  }

  /**
   * Processes commit/issue/pr data for Table by creating appropriate TableDataObjects and pushing them into an array for iteration.
   */
  processTableData() {
    let tableDataObject: TableDataObject;
    for (var key in this.member.previousCommitsWithLink) {
      if (this.member.previousCommitsWithLink.hasOwnProperty(key)) {
        // Format date string so it is a valid argument for the Date() constructor
        let year = key.split(" ");
        console.log(year);
        tableDataObject = new TableDataObject(new Date(key), this.member.previousCommitsWithLink[key]);
        this.commitsTableData.push(tableDataObject);
      }
    }
    for (var key in this.member.previousPullRequestsWithLink) {
      if (this.member.previousPullRequestsWithLink.hasOwnProperty(key)) {
        tableDataObject = new TableDataObject(key, this.member.previousPullRequestsWithLink[key]);
        this.pullRequestsTableData.push(tableDataObject);
      }
    }
    for (var key in this.member.previousIssuesWithLink) {
      if (this.member.previousIssuesWithLink.hasOwnProperty(key)) {
        console.log(new Date(key));
        tableDataObject = new TableDataObject(key, this.member.previousIssuesWithLink[key]);
        this.issuesTableData.push(tableDataObject);
      }
    }
  }
}
