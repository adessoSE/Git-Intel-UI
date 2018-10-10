import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Repository } from '../entities/repository';
import { DataPullService } from '../services/data-pull.service';
import { GlobalNavigationService } from '../services/global-navigation.service';
import { ChartJsData } from '../entities/chartJS';

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

  chartCommits: ChartJsData;
  chartPRs: ChartJsData;
  chartIssues: ChartJsData;

  constructor(
    private activeRoute: ActivatedRoute,
    private dataPullService: DataPullService,
    private navService: GlobalNavigationService) { }

  ngOnInit() {
    this.determineOrganization();
  }

  determineOrganization() {
    let org = this.activeRoute.snapshot.paramMap.get('organization');

    this.dataPullService.requestRepositories(org).subscribe(data => this.processData(data));
  }

  processData(repo: Repository[]) {
    this.repositories = repo;
    this.repositoriesCopy = repo;
    this.navService.tellNumOfEntities(repo.length);
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

  sumOf(numbers: Array<number>) {
    let sum = numbers.reduce((acc, cur) => acc + cur, 0);
    return sum;
  }

  generateChartJSData(chartJSLabelsCommits: any, chartJSDatasetCommits: any, chartJSLabelsPullRequests: any, chartJSDatasetPullRequests: any, chartJSLabelsIssues: any, chartJSDatasetIssues: any,) {
    this.chartCommits = {
      labels: chartJSLabelsCommits,
      data: [{ data: chartJSDatasetCommits, label: "Commits" }],
      caption: "Latest commits"
    };
    this.chartPRs = {
      labels: chartJSLabelsPullRequests,
      data: [{ data: chartJSDatasetPullRequests, label: "Pull Requests" }],
      caption: "Latest Pull Requests"
    };
    this.chartIssues = {
      labels: chartJSLabelsIssues,
      data: [{ data: chartJSDatasetIssues, label: "Issues" }],
      caption: "Latest Issues"
    };
  }
}
