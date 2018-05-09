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

  constructor(private memberService: MemberService, private route: ActivatedRoute,
    private router: Router, private globalNavService: GlobalNavigationService) {

    router.events.subscribe((val) => { this.determineMember(); });
  }

  ngOnInit() {
  }

  determineMember() {
    let usr = this.route.snapshot.paramMap.get('username');
    this.member = this.memberService.getMemberDetails(usr);
  }

}
