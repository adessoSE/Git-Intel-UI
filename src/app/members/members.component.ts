import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Member } from '../entities/member';
import { DataPullService } from '../services/data-pull.service';
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
    // If the user has no 'name', use 'username' for comparison
    this.members.sort((a: Member, b: Member) => {
      if (a.name == null) {
        return a.username.localeCompare(b.name)
      }
      if (b.name == null) {
        return a.name.localeCompare(b.username);
      }
      else {
        return a.name.localeCompare(b.name);
      }
    });
    this.sortByTag = "Alphabet";
  }

  sortByCommits() {
    this.members.sort((a: Member, b: Member) => {
      return +b.amountPreviousCommits - +a.amountPreviousCommits;
    });
    this.sortByTag = "Commits";
  }

  sortByPullRequests() {
    this.members.sort((a: Member, b: Member) => {
      return +b.amountPreviousPullRequests - +a.amountPreviousPullRequests;
    });
    this.sortByTag = "Pull Requests";
  }

  sortByIssues() {
    this.members.sort((a: Member, b: Member) => {
      return +b.amountPreviousIssues - +a.amountPreviousIssues;
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
