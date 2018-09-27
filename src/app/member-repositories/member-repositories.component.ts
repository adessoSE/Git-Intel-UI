import { Component, OnInit, Input } from '@angular/core';
import { Repository } from '../entities/repository';
import { ActivatedRoute } from '@angular/router';
import { DataPullService } from '../services/data-pull.service';
import { GlobalNavigationService } from '../services/global-navigation.service';
import { Organization } from '../entities/organization';

@Component({
  selector: 'app-member-repositories',
  templateUrl: './member-repositories.component.html',
  styleUrls: ['./member-repositories.component.css']
})
export class MemberRepositoriesComponent implements OnInit {

  @Input() organization: Organization;

  repositories: Repository[];
  repositoriesCopy: Repository[];

  sortByTag: string = "";

  constructor(
    private activeRoute: ActivatedRoute,
    private dataPullService: DataPullService,
    private navService: GlobalNavigationService) { }

    ngOnInit() {
      this.determineOrganization();
    }
  
    determineOrganization() {
      let org = this.activeRoute.snapshot.paramMap.get('organization');
  
      this.dataPullService.requestOrganization(org).subscribe(data => this.processData(data));
    }
  
    processData(orga: Organization) {
      if (orga != null) {
        this.organization = orga;
        console.log(orga);
        this.repositories = this.organization.createdReposByMembers;
        this.repositoriesCopy = this.repositories;
      }
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
}
