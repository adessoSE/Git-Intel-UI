import { Component, OnInit } from '@angular/core';
import { Team } from '../entities/team';
import { TeamService } from '../services/team.service';
import { DataPullService } from '../services/data-pull.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team[];
  teamsCopy: Team[];

  sortByTag: string = "";

  constructor(
    private memberService: TeamService,
    private dataPullService: DataPullService,
    private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.determineOrganization();
  }

  determineOrganization() {
    let org = this.activeRoute.snapshot.paramMap.get('organization');

    this.dataPullService.requestTeams(org).subscribe(data => this.processData(data));
  }

  processData(teams: Team[]) {
    this.teams = teams;
    this.teamsCopy = teams;
    console.log(teams);
  }

  sortByAlphabet() {
    this.teams.sort((a: Team, b: Team) => a.name.localeCompare(b.name));
    this.sortByTag = "Alphabet";
  }

  sortByCommits() {
    this.teams.sort((a: Team, b: Team) => {
      return +b.commits - +a.commits;
    });
    this.sortByTag = "Commits";
  }

  sortByMembers() {
    this.teams.sort((a: Team, b: Team) => {
      return +b.members.length - +a.members.length;
    });
    this.sortByTag = "Member size";
  }

  sortByRepositories() {
    this.teams.sort((a: Team, b: Team) => {
      return +b.repositories.length - +a.repositories.length;
    });
    this.sortByTag = "Pull Requests";
  }

  search(term: string) {
    setTimeout(() => {
      this.teams = this.teamsCopy.filter(e => {
        return e.name.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase());
      });
    }, 50);

  }
}
