import { Component, OnInit } from '@angular/core';
import { Member } from '../entities/member';
import { MemberService } from '../services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartJs } from '../entities/chartJS';
import { CHARTJS_DEFAULT } from '../mock-data';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  member: Member; 
  chartCommits: ChartJs = CHARTJS_DEFAULT;
  chartPRs: ChartJs = CHARTJS_DEFAULT;
  chartIssues: ChartJs = CHARTJS_DEFAULT;

  constructor(private memberService: MemberService, private route: ActivatedRoute,
    private router: Router) {

    // Must be handled before onInit, because organization will be undefined otherwise 
    router.events.subscribe((val) => { this.determineMember(); });
  }

  ngOnInit() { }

  determineMember() {
    let usr = this.route.snapshot.paramMap.get('username');
    this.member = this.memberService.getMemberDetails(usr);
    this.chartCommits.chartContent = this.member.previousCommits;
    this.chartPRs.chartContent = this.member.previousPullRequests;
    this.chartIssues.chartContent = this.member.previousIssues;
  }

}
