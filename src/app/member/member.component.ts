import { Component, OnInit } from '@angular/core';
import { Member } from '../entities/member';
import { MemberService } from '../services/member.service';
import { GlobalNavigationService } from '../services/global-navigation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  member: Member;

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

  constructor(private memberService: MemberService, private route: ActivatedRoute,
    private router: Router, private globalNavService: GlobalNavigationService) {

    // Must be handled before onInit, because organization will be undefined otherwise 
    router.events.subscribe((val) => { this.determineMember(); });
  }

  ngOnInit() {
    this.chartData = [{ data: [2, 2, 1, 2], label: 'Pull Requests last 5 Days' }];
    this.chartLabels = ['16/4/2018', '19/4/2018', '20/4/2018', '21/4/2018'];
  }

  determineMember() {
    let usr = this.route.snapshot.paramMap.get('username');
    this.member = this.memberService.getMemberDetails(usr);
  }

}
