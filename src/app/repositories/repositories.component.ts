import { Component, OnInit } from '@angular/core';
import { Repository } from '../entities/repository';
import { RepositoryService } from '../services/repository.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  repositories: Repository[];
  repositoriesCopy: Repository[];

  orgName: string = "";
  sortByToggle: string = 'Members';

  constructor(
    private repoService: RepositoryService,
    private activeRoute: ActivatedRoute,
    private router: Router) {

    this.repositories = repoService.getRepositories();
    // Necessary copy for filter function    
    this.repositoriesCopy = this.repositories;

    router.events.subscribe((val) => { this.orgName = this.activeRoute.snapshot.paramMap.get('organization'); });
  }

  ngOnInit() { }

  sortByAlphabet() {
    this.repositories.sort((a: Repository, b: Repository) => a.name.localeCompare(b.name));
  }

  sortByCommits() {
    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.commits - +a.commits;
    });
  }

  sortByIssues() {
    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.issues - +a.issues;
    });
  }

  sortByForks() {
    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.forks - +a.forks;
    });
  }

  sortByLicense() {
    this.repositories.sort((a: Repository, b: Repository) => a.license.localeCompare(b.license));
  }

  sortByPullRequests() {
    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.pullRequests - +a.pullRequests;
    });
  }

  sortByStars() {
    this.repositories.sort((a: Repository, b: Repository) => {
      return +b.stars - +a.stars;
    });
  }

  search(term: string) {
    this.repositories = this.repositoriesCopy.filter(e => {
      return e.name.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase());
    });
  }
}
