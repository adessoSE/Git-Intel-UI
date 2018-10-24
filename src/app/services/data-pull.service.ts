import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Member } from '../entities/member';
import { Organization } from '../entities/organization';
import { Repository } from '../entities/repository';
import { Team } from '../entities/team';

@Injectable()
export class DataPullService {

  gitStalkerURL: string = 'http://localhost:8080/';

  constructor(private _http: HttpClient) { }

  /**
   * 
   * GET Request to the correct REST endpoint and receive appropriate data. 
   * @param organizationName 
   */
  requestOrganization(organizationName: string): Observable<Organization> {
    let requestURL = this.gitStalkerURL + 'organizationdetail' + '/' + organizationName;
    console.log("ORGANIZATION DATA REQUESTED");
    return this._http.get<Organization>(requestURL);
  }

  requestMembers(organizationName: string): Observable<Member[]> {
    let requestURL = this.gitStalkerURL + 'members' + '/' + organizationName;
    console.log("MEMBER DATA REQUESTED");
    return this._http.get<Member[]>(requestURL);
  }

  requestRepositories(organizationName: string): Observable<Repository[]> {
    let requestURL = this.gitStalkerURL + 'repositories' + '/' + organizationName;
    console.log("REPOSITORY DATA REQUESTED");
    return this._http.get<Repository[]>(requestURL);
  }

  requestMemberRepositories(organizationName: string): Observable<[Repository[]]> {
    let requestURL = this.gitStalkerURL + 'createdreposbymembers' + '/' + organizationName;
    console.log("MEMBER REPOSITORY DATA REQUESTED");
    return this._http.get<[Repository[]]>(requestURL);
  }

  requestTeams(organizationName: string): Observable<Team[]> {
    let requestURL = this.gitStalkerURL + 'teams' + '/' + organizationName;
    console.log("TEAM DATA REQUESTED");
    return this._http.get<Team[]>(requestURL);
  }

  requestExternalRepositories(organizationName: string): Observable<Repository[]> {
    let requestURL = this.gitStalkerURL + 'externalrepositories' + '/' + organizationName;
    console.log("EXTERNAL REPOSITORY DATA REQUESTED");
    return this._http.get<Repository[]>(requestURL);
  }

}
