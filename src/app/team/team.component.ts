import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Member } from '../entities/member';
import { Team } from '../entities/team';
import { Repository } from '../entities/repository';

import { TeamService } from '../services/team.service';

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

  constructor(private teamService: TeamService, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(params => {
      this.team = this.teamService.getTeamDetails(params["name"]);

      // Seperate Member and Repository components are necessary for filtering

      this.members = this.team.members;
      this.membersCopy = this.members;

      this.repositories = this.team.repositories;
      this.repositoriesCopy = this.repositories;
    });
  }

  ngOnInit() { }

  sortByAlphabet() {
    this.members.sort((a: Member, b: Member) => a.name.localeCompare(b.name));
    this.repositories.sort((a: Repository, b: Repository) => a.name.localeCompare(b.name));
    this.sortByTag = "Alphabet";   
  }

  sortByCommits() {
    this.members.sort((a: Member, b: Member) => {
      return +b.commits - +a.commits;
    });

    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.commits - +a.commits;
    });
    this.sortByTag = "Commits";  
  }

  sortByIssues() {
    this.members.sort((a: Member, b: Member) => {
      return +b.issues - +a.issues;
    });

    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.issues - +a.issues;
    });
    this.sortByTag = "Issues"; 
  }

  sortByPullRequests() {
    this.members.sort((a: Member, b: Member) => {
      return +b.pullRequests - +a.pullRequests;
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
