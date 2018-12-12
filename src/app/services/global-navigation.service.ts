import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Tab } from '../entities/tab';
import { DataPullService } from './data-pull.service';


@Injectable()
export class GlobalNavigationService {

  organization: string = "";

  private _numOfEntities: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public numOfEntitiesEmitter: Observable<number> = this._numOfEntities.asObservable();

  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

  public _openNewTab: BehaviorSubject<Tab> = new BehaviorSubject<Tab>(null);
  public onOpenNewTabEmitter: Observable<Tab> = this._openNewTab.asObservable();

  constructor() { }

  tellNumOfEntities(n: number) {
    this._numOfEntities.next(n);
  }

  getNumOfEntities(): BehaviorSubject<number> {
    return this._numOfEntities;
  }

  showNavBar(ifShow: boolean) {
    this._showNavBar.next(ifShow);
  }

  onOpenNewTab(url: string) {
    let idxDash = url.indexOf("/");
    let idxSubstr = idxDash === -1 ? url.length : idxDash;

    let org = url.substring(0, idxSubstr);

    let tab = { org: org, url: url, name: "processing..." };
    this._openNewTab.next(tab);
  }

}
