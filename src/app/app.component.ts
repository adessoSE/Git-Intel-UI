import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { PopoverModule } from "ngx-popover";

import { HomeComponent } from './home/home.component';
import { Tab } from './entities/tab';

import { GlobalNavigationService } from './services/global-navigation.service';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	organization: string = "";
	tabs: string[] = ["home"];
	tabss: Tab[] = [{ id: 0, org: "home", url: "/home" }];
	route: string = "";
	isSearchInvalid: boolean = false;

	constructor(
		private globalNavService: GlobalNavigationService,
		private location: Location,
		private router: Router,
		private activatedRoute: ActivatedRoute) {

		this.globalNavService.onOpenNewTabEmitter.subscribe((tab) => { if (tab.org !== "home") this.openNewTab(tab) });
		
		this.router.events
			.filter((event) => event instanceof NavigationEnd)
			.map(() => this.activatedRoute)
			.map((route) => {
				while (route.firstChild) route = route.firstChild;
				return route;
			})
			.filter((route) => route.outlet === 'primary')
			.mergeMap((route) => route.url)
			.subscribe((event) => {
				//console.log('NavigationEnd:', event);
				this.checkIfTabExists(event);
			});

	}

	onClickStalk(org: string) {
		this.globalNavService.onOpenNewTab(org);
	}

	openNewTab(tab: Tab) {
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

	// As of right now: useless 
	onClickTab() {
		this.globalNavService.onClickTab(true);

	}

	checkIfTabExists(pathArray: UrlSegment []) {
		/*let path = this.location.path();

		if (this.tabss.some(tab => tab.url !== path)) {
			console.log(path + " needs to be inserted")
			this.globalNavService.onOpenNewTab(path);
		}
		*/
		let uri = "";
		pathArray.forEach(str => { uri += str.toString() + "/"} );
		uri = uri.substring(0, uri.lastIndexOf("/"))


		if (this.tabss.some(tab => tab.url !== uri)) {
			console.log(uri + " needs to be inserted")
			this.globalNavService.onOpenNewTab(uri);
		}

	}

	checkSearchTerm(term: string): boolean {
		// TODO: Use Regular Epressions
		// Rules according to https://gist.github.com/tonybruess/9405134
		let res = false;
		if (term !== undefined) {
			if (term.length > 0 && term.length < 40 && term[0] !== "-") {
				res = true;
			}
		}
		return res;
	}

}
