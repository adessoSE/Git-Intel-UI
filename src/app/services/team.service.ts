import { Injectable } from '@angular/core';
import { GlobalNavigationService } from './global-navigation.service';
import { Team } from '../entities/team';
import { TEAMS } from '../mock-data';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { DataPullService } from './data-pull.service';

@Injectable()
export class TeamService {

  team: Team;

  constructor(
    private globalNavService: GlobalNavigationService,
    private activeRoute: ActivatedRoute,
    private dataPullService: DataPullService) {
    // Set the number of "entities" displayed in the breadcrumbs to 0 so they are disabled in navigation-bar.component.html.
    globalNavService.tellNumOfEntities(0);
  }

  determineTean() {
    let team = this.activeRoute.snapshot.paramMap.get('name');
    this.findTeamByName(team);
  }

  findTeamByName(teamname: string) {
    let organization = this.activeRoute.snapshot.paramMap.get('organization');
    this.dataPullService.requestTeams(organization).subscribe(data => {
      for (let team of data) {
        if (team.name === name) {
          this.team = team;
        }
      }
    });
  }
}
