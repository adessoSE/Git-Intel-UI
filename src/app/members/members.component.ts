import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { Member } from '../entities/member';
import { DataPullService } from '../services/data-pull.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { GlobalNavigationService } from '../services/global-navigation.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[];
  membersCopy: Member[];

  previousCommits: number[];

  sortByTag: string = "";


  constructor(
    private memberService: MemberService,
    private dataPullService: DataPullService,
    private activeRoute: ActivatedRoute,
    private navService: GlobalNavigationService) { }

  /**
   * Uses @memberService to get data and initialize 
   * a copy to apply filter and sorting funcionality.      
   */
  ngOnInit() {
    this.determineOrganization();
  }

  determineOrganization() {
    let org = this.activeRoute.snapshot.paramMap.get('organization');

    this.dataPullService.requestMembers(org).subscribe(data => this.processData(data));
  }

  processData(members: Member[]) {
    this.members = members;
    this.membersCopy = members;
    this.navService.tellNumOfEntities(members.length);
    console.log(members);
  }

  sortByAlphabet() {
    this.members.sort((a: Member, b: Member) => a.name.localeCompare(b.name));
    this.sortByTag = "Alphabet";
  }

  sortByCommits() {
    this.members.sort((a: Member, b: Member) => {
      return +b.commits - +a.commits;
    });
    this.sortByTag = "Commits";
  }

  sortByPullRequests() {
    this.members.sort((a: Member, b: Member) => {
      return +b.pullRequests - +a.pullRequests;
    });
    this.sortByTag = "Pull Requests";
  }

  sortByIssues() {
    this.members.sort((a: Member, b: Member) => {
      return +b.issues - +a.issues;
    });
    this.sortByTag = "Issues";
  }

  search(term: string) {
    setTimeout(() => {
      this.members = this.membersCopy.filter(e => {
        return e.name.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase());
      });
    }, 50);
  }


}
