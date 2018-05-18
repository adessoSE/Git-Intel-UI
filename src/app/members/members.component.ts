import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { Member } from '../entities/member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[];
  sortByToggle: string = 'commits';

  constructor(memberService: MemberService) {
    this.members = memberService.getMembers();
  }

  ngOnInit() { }

  sortByAlphabet() {
    this.members.sort((a: Member, b: Member) => a.name.localeCompare(b.name));
  }

  sortByCommits() {
    this.members.sort((a: Member, b: Member) => {
      return +b.commits - +a.commits;
    });
  }

  sortByPullRequests() {
    this.members.sort((a: Member, b: Member) => {
      return +b.pullRequests - +a.pullRequests;
    });
  }

  sortByIssues() {
    this.members.sort((a: Member, b: Member) => {
      return +b.issues - +a.issues;
    });
  }


}
