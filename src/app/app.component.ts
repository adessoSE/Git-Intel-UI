import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverModule } from "ngx-popover";

import { HomeComponent } from './home/home.component';

import { GlobalNavigationService } from './services/global-navigation.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	organization: string = "";
	tabs: string[] = ["home"];
	isSearchInvalid: boolean = false;

	constructor(
		private router: Router,
		private globalNavService: GlobalNavigationService) {

		this.globalNavService.onOpenNewTabEmitter.subscribe((tab) => { if (tab !== "") this.openNewTab(tab) });
	}

	openNewTab(orga: string) {
		if (this.checkSearchTerm(orga)) {
			this.isSearchInvalid = false;
			this.tabs.push(orga);
			this.router.navigate(["/" + orga]);
		}
		else {
			this.isSearchInvalid = true;
		}
	}

	/* Known issue: 
	 	Trying to close a tab with multiple instances
		of the same name only closes the first one,
		because it's the first result of tabs.find
	*/
	closeTab(tab: string) {
		const index: number = this.tabs.indexOf(tab);
		if (index > 0) {
			this.tabs.splice(index, 1);
			this.router.navigate(["/" + this.tabs[index - 1]]);
		}
	}

	onClickTab() {
		this.globalNavService.onClickTab(true);
	}

	checkSearchTerm(term: string) : boolean {
		// TODO: Use Regular Epressions
		// Rules according to https://gist.github.com/tonybruess/9405134
		return term.length > 0 && term.length < 40 && term[0] !== "-";
	}

}
