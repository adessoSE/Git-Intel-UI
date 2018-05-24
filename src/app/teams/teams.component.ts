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
  teamsCopy: Team [];

  sortByTag: string = "";  

  constructor(memberService: TeamService) { 
    this.teams = memberService.getTeams();
    this.teamsCopy = this.teams;
  }

  ngOnInit() { }

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
    this.teams = this.teamsCopy.filter(e => {
      return e.name.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase());
    });
  }
}
