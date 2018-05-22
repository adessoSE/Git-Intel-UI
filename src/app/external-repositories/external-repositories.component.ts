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

  constructor(
    private extRepoService: ExRepositoryService,
    private activeRoute: ActivatedRoute,
    private router: Router) {

    this.extRepos = extRepoService.getExRepositories();
    // Necessary copy for filter function    
    this.extReposCopy = this.extRepos;
    
    router.events.subscribe((val) => { this.orgName = this.activeRoute.snapshot.paramMap.get('organization'); });
  }

  ngOnInit() {
  }

  sortByAlphabet() {
    this.extRepos.sort((a: Repository, b: Repository) => a.name.localeCompare(b.name));
  }

  sortByCommits() {
    this.extRepos.sort((a: Repository, b: Repository) => {
      return +b.commits - +a.commits;
    });
  }

  sortByIssues() {
    this.extRepos.sort((a: Repository, b: Repository) => {
      return +b.issues - +a.issues;
    });
  }

  sortByForks() {
    this.extRepos.sort((a: Repository, b: Repository) => {
      return +b.forks - +a.forks;
    });
  }

  sortByLicense() {
    this.extRepos.sort((a: Repository, b: Repository) => a.license.localeCompare(b.license));
  }

  sortByPullRequests() {
    this.extRepos.sort((a: Repository, b: Repository) => {
      return +b.pullRequests - +a.pullRequests;
    });
  }

  sortByStars() {
    this.extRepos.sort((a: Repository, b: Repository) => {
      return +b.stars - +a.stars;
    });
  }

  search(term: string) {
    this.extRepos = this.extReposCopy.filter(e => {
      return e.name.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase());
    });
  }
}
