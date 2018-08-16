import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../entities/member';
import { Repository } from '../entities/repository';
import { Team } from '../entities/team';
import { DataPullService } from '../services/data-pull.service';
import { GlobalNavigationService } from '../services/global-navigation.service';



@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  sortByTag: string = "";

  team: Team;

  members: Member[];
  membersCopy: Member[];

  repositories: Repository[];
  repositoriesCopy: Repository[];

  constructor(
    private navService: GlobalNavigationService,
    private activatedRoute: ActivatedRoute,
    private dataPullService: DataPullService) {

    // Set the number of "entities" displayed in the breadcrumbs to 0 so they are disabled in navigation-bar.component.html.
    this.navService.tellNumOfEntities(0);
    this.determineTeam();
  }

  ngOnInit() { }

  determineTeam() {
    let team = this.activatedRoute.snapshot.paramMap.get('name');
    this.findTeamByName(team);
  }

  findTeamByName(teamname: string) {
    let organization = this.activatedRoute.snapshot.paramMap.get('organization');
    this.dataPullService.requestTeams(organization).subscribe(data => {
      for (let team of data) {
        if (team.name === teamname) {
          this.team = team;
          console.log(team);
        }
      }
    });
  }

  sortByAlphabet() {
    this.members.sort((a: Member, b: Member) => a.name.localeCompare(b.name));
    this.repositories.sort((a: Repository, b: Repository) => a.name.localeCompare(b.name));
    this.sortByTag = "Alphabet";
  }

  sortByCommits() {
    this.members.sort((a: Member, b: Member) => {
      return +b.amountPreviousCommits - +a.amountPreviousCommits;
    });

    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.commits - +a.commits;
    });
    this.sortByTag = "Commits";
  }

  sortByIssues() {
    this.members.sort((a: Member, b: Member) => {
      return +b.amountPreviousIssues - +a.amountPreviousIssues;
    });

    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.issues - +a.issues;
    });
    this.sortByTag = "Issues";
  }

  sortByPullRequests() {
    this.members.sort((a: Member, b: Member) => {
      return +b.amountPreviousPullRequests - +a.amountPreviousPullRequests;
    });

    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.pullRequests - +a.pullRequests;
    });
    this.sortByTag = "Pull Requests";
  }

  search(term: string) {
    this.members = this.membersCopy.filter(e => {
      return e.name.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase());
    });

    this.repositories = this.repositoriesCopy.filter(e => {
      return e.name.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase());
    });
  }

}
