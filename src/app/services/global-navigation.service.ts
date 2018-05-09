import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { NavigationObj } from '../entities/nav-obj';

@Injectable()
export class GlobalNavigationService {
  
  private _numOfEntities: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public numOfEntitiesEmitter: Observable<number> = this._numOfEntities.asObservable();

  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

  private _openNewTab: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public onOpenNewTabEmitter: Observable<string> = this._openNewTab.asObservable();

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
    this._openNewTab.next(orga);
  }

  onClickTab(clicked: boolean) {
    this._tabClicked.next(clicked);
  }
  
}
