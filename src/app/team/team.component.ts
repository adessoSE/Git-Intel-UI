import { Component, OnInit } from '@angular/core';
import { Team } from '../entities/team';
import { TeamService } from '../services/team.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: Team;

  constructor(private teamService: TeamService, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(params => {
      this.team = this.teamService.getTeamDetails(params["name"]);
    });
  }

  ngOnInit() {
  }


}
