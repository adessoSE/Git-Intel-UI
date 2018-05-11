import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverModule } from "ngx-popover";

import { HomeComponent } from './home/home.component';

import { GlobalNavigationService } from './services/global-navigation.service';
import { Tab } from './entities/tab';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	organization: string = "";
	tabs: string[] = ["home"];
	tabss: Tab[] = [{ id: 0, org: "home", url: "home" }];
	isSearchInvalid: boolean = false;

	constructor(
		private router: Router,
		private globalNavService: GlobalNavigationService) {

		this.globalNavService.onOpenNewTabEmitter.subscribe((tab) => { if (tab.org !== "home") this.openNewTab(tab) });
	}

	openNewTab(tab: Tab) {
		console.log(tab);
		if (this.checkSearchTerm(tab.org)) {
			this.isSearchInvalid = false;
			this.tabss.push(tab);
			this.router.navigate([tab.org]);
		}
		else {
			this.isSearchInvalid = true;
		}
	}

	closeTab(removeTab: Tab) {
		var idx = this.tabss.indexOf(removeTab);
		if (idx > 0) {
			this.tabss.splice(idx, 1);
			this.router.navigate(["/" + this.tabss[idx - 1].url]);
		}
	}

	onClickTab() {
		this.globalNavService.onClickTab(true);
	}

	checkSearchTerm(term: string): boolean {
		// TODO: Use Regular Epressions
		// Rules according to https://gist.github.com/tonybruess/9405134
		return term.length > 0 && term.length < 40 && term[0] !== "-";
	}

}
