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

  private _openNewTab: BehaviorSubject<Tab> = new BehaviorSubject<Tab>({ id: 0, org: "home" ,url: "home" });
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

  onOpenNewTab(orga: string) {
    let id = new Date().getMilliseconds();
    let tab = {id : id, org: orga, url: "home"};
    console.log(tab);
    
    this._openNewTab.next(tab);
  }

  onClickTab(clicked: boolean) {
    this._tabClicked.next(clicked);
  }
  
}
