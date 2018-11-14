import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Member } from '../entities/member';
import { DataPullService } from '../services/data-pull.service';
import { GlobalNavigationService } from '../services/global-navigation.service';
import { ProcessingOrganizationInfo } from '../entities/processingOrganizationInfo';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[];
  membersCopy: Member[];

  previousCommits: number[];

  statusCode: number;
  error: HttpErrorResponse;
  initializedProcessingInterval: boolean = false;
  interval: any;
  processingInformation: ProcessingOrganizationInfo;
  progressBarPercentage: number = 0;
  myStyles = {
    width: this.progressBarPercentage + "%"
  };

  sortByTag: string = "";


  constructor(
    private dataPullService: DataPullService,
    private activeRoute: ActivatedRoute,
    private navService: GlobalNavigationService) { }

  /**
   * Uses @memberService to get data and initialize 
   * a copy to apply filter and sorting funcionality.      
   */
  ngOnInit() {
    this.determineOrganization();
  }

  determineOrganization() {
    let org = this.activeRoute.snapshot.paramMap.get('organization');

    this.dataPullService.requestMembers(org).subscribe(data => this.processData(data), error => this.processError(error));
  }

  initRequestInterval() {
    if (!this.initializedProcessingInterval) {
      this.initializedProcessingInterval = true;
      this.interval = setInterval( () => {
        this.dataPullService.requestMembers(this.processingInformation.searchedOrganization.toString()).subscribe(data => this.processData(data), error => this.processError(error));
      }, 10000);
  }
}

initProgressBar() {   
  var progressBarIncreasementPerFinishedRequestType: number = 100 / this.processingInformation.totalCountOfRequestTypes;
  this.progressBarPercentage = (Math.round(progressBarIncreasementPerFinishedRequestType * 10) / 10) * this.processingInformation.finishedRequestTypes.length;
  this.myStyles.width = this.progressBarPercentage + "%";
}

processError(error: HttpErrorResponse) {
  this.statusCode = 400;
  this.error = error;
  console.log("Error Processing");
}

  processData(members: HttpResponse<Member[]>) {
    switch (members.status) {
      case 200:
        this.statusCode = 200;
        this.members = members.body;
        this.membersCopy = members.body;
        this.navService.tellNumOfEntities(members.body.length);
        clearInterval(this.interval);
        break;
      case 202:
        this.statusCode = 202;
        this.processingInformation = JSON.parse(JSON.stringify(members.body));
        console.log(this.processingInformation)
        console.log("Accepted - 202");
        this.initRequestInterval();
        this.initProgressBar();
        break;
    }
  }

  sortByAlphabet() {
    // If the user has no 'name', use 'username' for comparison
    this.members.sort((a: Member, b: Member) => {
      if (a.name == null) {
        return a.username.localeCompare(b.name)
      }
      if (b.name == null) {
        return a.name.localeCompare(b.username);
      }
      else {
        return a.name.localeCompare(b.name);
      }
    });
    this.sortByTag = "Alphabet";
  }

  sortByCommits() {
    this.members.sort((a: Member, b: Member) => {
      return +b.amountPreviousCommits - +a.amountPreviousCommits;
    });
    this.sortByTag = "Commits";
  }

  sortByPullRequests() {
    this.members.sort((a: Member, b: Member) => {
      return +b.amountPreviousPullRequests - +a.amountPreviousPullRequests;
    });
    this.sortByTag = "Pull Requests";
  }

  sortByIssues() {
    this.members.sort((a: Member, b: Member) => {
      return +b.amountPreviousIssues - +a.amountPreviousIssues;
    });
    this.sortByTag = "Issues";
  }

  search(term: string) {
    setTimeout(() => {
      this.members = this.membersCopy.filter(e => {
        let usedNameToFilter;
        if (e.name != null) {
          usedNameToFilter = e.name;
        } else {
          usedNameToFilter = e.username;
        }
        return usedNameToFilter.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase());
      });
    }, 50);
  }


}
