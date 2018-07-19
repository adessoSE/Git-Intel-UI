import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Organization } from '../entities/organization';
import { Info } from '../enums/INFO';
import { Member } from '../entities/member';

@Injectable()
export class DataPullService {

  gitStalkerURL: string = 'http://localhost:8080/';

  params: HttpParams;

  constructor(private _http: HttpClient) { }

  requestOrganization(organizationName: string): Observable<Organization> {
    this.params = new HttpParams().set('name', organizationName);
    let requestURL = this.gitStalkerURL + 'organizationdetail';
    return this._http.post<Organization>(requestURL, this.params);
  }

  requestMembers(organizationName: string): Observable<Member[]> {
    this.params = new HttpParams().set('name', organizationName);
    let requestURL = this.gitStalkerURL + 'members';
    return this._http.post<Member[]>(requestURL, this.params);
  }

}
