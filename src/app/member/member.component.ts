import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartJsData } from '../entities/chartJS';
import { Member } from '../entities/member';
import { DataPullService } from '../services/data-pull.service';
import { GlobalNavigationService } from '../services/global-navigation.service';

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
}
