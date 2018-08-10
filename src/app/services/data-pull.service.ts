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
   * Set the organization's name as needed http parameter for the post operation.
   * Post to the correct REST endpoint and receive appropriate data. 
   * @param organizationName 
   */
  requestOrganization(organizationName: string): Observable<Organization> {
    this.params = new HttpParams().set('name', organizationName);
    let requestURL = this.gitStalkerURL + 'organizationdetail';
    console.log("ORGANIZATION DATA REQUESTED");
    return this._http.post<Organization>(requestURL, this.params);
  }

  requestMembers(organizationName: string): Observable<Member[]> {
    this.params = new HttpParams().set('name', organizationName);
    let requestURL = this.gitStalkerURL + 'members';
    console.log("MEMBER DATA REQUESTED");
    return this._http.post<Member[]>(requestURL, this.params);
  }

  requestRepositories(organizationName: string): Observable<Repository[]> {
    this.params = new HttpParams().set('name', organizationName);
    let requestURL = this.gitStalkerURL + 'repositories';
    console.log("REPOSITORY DATA REQUESTED");
    return this._http.post<Repository[]>(requestURL, this.params);
  }

  requestTeams(organizationName: string): Observable<Team[]> {
    this.params = new HttpParams().set('name', organizationName);
    let requestURL = this.gitStalkerURL + 'teams';
    console.log("TEAM DATA REQUESTED");
    return this._http.post<Team[]>(requestURL, this.params);
  }

}
