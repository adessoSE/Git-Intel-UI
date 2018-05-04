import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GlobalNavigationService {

  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

  private _openNewTab: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public onOpenNewTabEmitter: Observable<string> = this._openNewTab.asObservable();

  constructor() { }

  showNavBar(ifShow: boolean) {
    this._showNavBar.next(ifShow);
  }

  onOpenNewTab(orga: string) {
    this._openNewTab.next(orga);
  }
  
}
