import { Component, OnInit } from '@angular/core';
import { Team } from '../entities/team';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team [];
  sortByToggle: string = 'Members';

  constructor(memberService: TeamService) { 
    this.teams = memberService.getTeams();
  }

  ngOnInit() {
  }
}
