import { Component, OnInit } from '@angular/core';
import { Repository } from '../entities/repository';
import { ExRepositoryService } from '../services/ex-repository.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-external-repositories',
  templateUrl: './external-repositories.component.html',
  styleUrls: ['./external-repositories.component.css']
})
export class ExternalRepositoriesComponent implements OnInit {

  extRepos: Repository[];
  extReposCopy: Repository[];
  orgName: string = "";
  sortByTag: string = "";

  constructor(
    private extRepoService: ExRepositoryService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  /**
   * Uses @extRepoService to get data and initialize 
   * a copy to apply filter and sorting funcionality.      
   */
  ngOnInit() {
    this.extRepos = this.extRepoService.getExRepositories();
    this.extReposCopy = this.extRepos;

    this.router.events.subscribe((val) => { this.orgName = this.activeRoute.snapshot.paramMap.get('organization'); });
    console.log(this.extRepos[0].contributor.username)
  }

  sortByAlphabet() {
    this.extRepos.sort((a: Repository, b: Repository) => a.name.localeCompare(b.name));
    this.sortByTag = "Alphabet";
  }

  sortByCommits() {
    this.extRepos.sort((a: Repository, b: Repository) => {
      return +b.commits - +a.commits;
    });
    this.sortByTag = "Commits";
  }

  sortByIssues() {
    this.extRepos.sort((a: Repository, b: Repository) => {
      return +b.issues - +a.issues;
    });
    this.sortByTag = "Issues";
  }

  sortByForks() {
    this.extRepos.sort((a: Repository, b: Repository) => {
      return +b.forks - +a.forks;
    });
    this.sortByTag = "Forks";
  }

  sortByLicense() {
    this.extRepos.sort((a: Repository, b: Repository) => a.license.localeCompare(b.license));
    this.sortByTag = "License";
  }

  sortByPullRequests() {
    this.extRepos.sort((a: Repository, b: Repository) => {
      return +b.pullRequests - +a.pullRequests;
    });
    this.sortByTag = "Pull Requests";
  }

  sortByStars() {
    this.extRepos.sort((a: Repository, b: Repository) => {
      return +b.stars - +a.stars;
    });
    this.sortByTag = "Stars";
  }

  search(term: string) {
    setTimeout(() => {
      this.extRepos = this.extReposCopy.filter(e => {
        return (e.name.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase()) || e.contributor.username.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase()));
      });
    }, 50);
  }
}
