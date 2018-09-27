import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Organization } from '../entities/organization';
import { Member } from '../entities/member';
import { Repository } from '../entities/repository';
import { Team } from '../entities/team';

@Injectable()
export class DataPullService {

  gitStalkerURL: string = 'http://localhost:8080/';

  params: HttpParams;

  constructor(private _http: HttpClient) { }

  /**
   * 
   * GET Request to the correct REST endpoint and receive appropriate data. 
   * @param organizationName 
   */
  requestOrganization(organizationName: string): Observable<Organization> {
    let requestURL = this.gitStalkerURL + 'organizationdetail' + '/' + organizationName;
    console.log("ORGANIZATION DATA REQUESTED");
    return this._http.post<Organization>(requestURL, this.params);
  }

  requestMembers(organizationName: string): Observable<Member[]> {
    let requestURL = this.gitStalkerURL + 'members' + '/' + organizationName;
    console.log("MEMBER DATA REQUESTED");
    return this._http.post<Member[]>(requestURL, this.params);
  }

  requestTeams(organizationName: string): Observable<Team[]> {
    let requestURL = this.gitStalkerURL + 'teams' + '/' + organizationName;
    console.log("TEAM DATA REQUESTED");
    return this._http.post<Team[]>(requestURL, this.params);
  }

  requestRepositories(organizationName: string): Observable<Repository[]> {
    let requestURL = this.gitStalkerURL + 'repositories' + '/' + organizationName;
    console.log("REPOSITORY DATA REQUESTED");
    return this._http.post<Repository[]>(requestURL, this.params);
  }

  requestMemberRepositories(organizationName: string): Observable<Repository[]> {
    let requestURL = this.gitStalkerURL + 'createdreposbymembers' + '/' + organizationName;
    console.log("MEMBER REPOSITORY DATA REQUESTED");
    return this._http.post<Repository[]>(requestURL, this.params);
  }

  requestExternalRepositories(organizationName: string): Observable<Repository[]> {
    let requestURL = this.gitStalkerURL + 'externalrepositories' + '/' + organizationName;
    console.log("EXTERNAL REPOSITORY DATA REQUESTED");
    return this._http.post<Repository[]>(requestURL, this.params);
  }

}
