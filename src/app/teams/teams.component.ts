import { Component, OnInit } from '@angular/core';
import { Team } from '../entities/team';
import { DataPullService } from '../services/data-pull.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { GlobalNavigationService } from '../services/global-navigation.service';

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
    private dataPullService: DataPullService,
    private activeRoute: ActivatedRoute,
    private navService: GlobalNavigationService) {
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
    this.navService.tellNumOfEntities(teams.length);
    console.log(teams);
  }

  sortByAlphabet() {
    this.teams.sort((a: Team, b: Team) => a.name.localeCompare(b.name));
    this.sortByTag = "Alphabet";
  }

  sortByMembers() {
    this.teams.sort((a: Team, b: Team) => {
      return +b.teamMembers.length - +a.teamMembers.length;
    });
    this.sortByTag = "Members";
  }

  sortByRepositories() {
    this.teams.sort((a: Team, b: Team) => {
      return +b.teamRepositories.length - +a.teamRepositories.length;
    });
    this.sortByTag = "Repositories";
  }

  search(term: string) {
    setTimeout(() => {
      this.teams = this.teamsCopy.filter(e => {
        return e.name.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase());
      });
    }, 50);

  }
}
