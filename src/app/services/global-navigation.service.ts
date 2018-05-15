import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Tab } from '../entities/tab';

@Injectable()
export class GlobalNavigationService {

  private _numOfEntities: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public numOfEntitiesEmitter: Observable<number> = this._numOfEntities.asObservable();

  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

  private _openNewTab: BehaviorSubject<Tab> = new BehaviorSubject<Tab>({ id: 0, org: "home", url: "home" });
  public onOpenNewTabEmitter: Observable<Tab> = this._openNewTab.asObservable();

  private _tabClicked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public onClickTabEmitter: Observable<boolean> = this._tabClicked.asObservable();

  constructor() { }

  tellNumOfEntities(n: number) {
    this._numOfEntities.next(n);
  }

  showNavBar(ifShow: boolean) {
    this._showNavBar.next(ifShow);
  }

  onOpenNewTab(url: string) {
    let org = url;
    //org = org.replace("/", "/ ")
    /*
    if (url.startsWith("/")) {
      org = url.slice(1);
    }
    */
    /*
    let idx = org.indexOf("/");

    if (idx !== -1) {
      org = url.substring(0, idx);
      console.log(org)
    }
    */

    let id = new Date().getMilliseconds();
    let tab = { id: id, org: org, url: url };

    this._openNewTab.next(tab);
  }

  onClickTab(clicked: boolean) {
    this._tabClicked.next(clicked);
  }

}
