import { Component, OnInit } from '@angular/core';
import { Member } from '../entities/member';
import { MemberService } from '../services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartJs, ChartJsData } from '../entities/chartJS';
import { CHARTJS_DEFAULT } from '../mock-data';

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

  constructor(private memberService: MemberService, private route: ActivatedRoute,
    private router: Router) {

    // Must be handled before onInit, because organization will be undefined otherwise 
    router.events.subscribe((val) => { this.determineMember(); });
  }

  ngOnInit() { }

  determineMember() {
    let usr = this.route.snapshot.paramMap.get('username');
    this.member = this.memberService.getMemberDetails(usr);

    this.chartIssues = this.member.previousIssues;
    this.chartCommits = this.member.previousCommits;
    this.chartPRs = this.member.previousPullRequests;
  }

}
