import { Component, OnInit } from '@angular/core';
import { Repository } from '../entities/repository';
import { RepositoryService } from '../services/repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataPullService } from '../services/data-pull.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  repositories: Repository[];
  repositoriesCopy: Repository[];

  orgName: string = "";
  sortByTag: string = "";

  constructor(
    private repositoryService: RepositoryService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private dataPullService: DataPullService) { }

  /**
   * Uses @repositoryService to get data and initialize 
   * a copy to apply filter and sorting funcionality.      
   */
  ngOnInit() {
    this.determineOrganization();

    this.router.events.subscribe((val) => { this.orgName = this.activeRoute.snapshot.paramMap.get('organization'); });
  }

  determineOrganization() {
    let org = this.activeRoute.snapshot.paramMap.get('organization');

    this.dataPullService.requestRepositories(org).subscribe(data => this.processData(data));
  }

  processData(repo: Repository[]) {
    this.repositories = repo;
    this.repositoriesCopy = repo;
    console.log(repo);
  }

  sortByAlphabet() {
    this.repositories.sort((a: Repository, b: Repository) => a.name.localeCompare(b.name));
    this.sortByTag = "Alphabet";
  }

  sortByCommits() {
    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.commits - +a.commits;
    });
    this.sortByTag = "Commits";
  }

  sortByIssues() {
    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.issues - +a.issues;
    });
    this.sortByTag = "Issues";
  }

  sortByForks() {
    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.forks - +a.forks;
    });
    this.sortByTag = "Forks";
  }

  sortByLicense() {
    this.repositories.sort((a: Repository, b: Repository) => a.license.localeCompare(b.license));
    this.sortByTag = "License";
  }

  sortByPullRequests() {
    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.pullRequests - +a.pullRequests;
    });
    this.sortByTag = "Pull Requests";
  }

  sortByStars() {
    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.stars - +a.stars;
    });
    this.sortByTag = "Stars";
  }

  search(term: string) {
    setTimeout(() => {
      this.repositories = this.repositoriesCopy.filter(e => {
        return e.name.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase());
      });
    }, 50);
  }
}
