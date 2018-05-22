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
  membersCopy: Member [];

  constructor(memberService: MemberService) {
    this.members = memberService.getMembers();
    // Necessary copy for filter function
    this.membersCopy = this.members;
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

  search(term: string) {
    this.members = this.membersCopy.filter(e => {
      return e.name.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase());
    });
  }


}
