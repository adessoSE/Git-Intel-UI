import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { PopoverModule } from "ngx-popover";

import { HomeComponent } from './home/home.component';
import { Tab } from './entities/tab';

import { GlobalNavigationService } from './services/global-navigation.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	organization: string = "";
	isSearchInvalid: boolean = false;

	tabs = new Array<Tab>();
	activeTabIdx: number = 0;

	constructor(
		private globalNavService: GlobalNavigationService,
		private location: Location,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private elRef: ElementRef, private renderer: Renderer) { }

	ngOnInit() {
		this.globalNavService.onOpenNewTabEmitter.subscribe((tab) => {
			if (tab !== null && tab.org !== "home")
				this.openNewTab(tab)
		});

		// TODO: Simplify
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
				let targetURL = this.concatURL(event);

				if (targetURL !== "home") {

					if (this.checkNewTab()) {
						this.globalNavService.onOpenNewTab(targetURL);
					} else {
						this.tabs[this.activeTabIdx].url = targetURL;
					}
				}
			});
	}

	onClickStalk(org: string) {
		if (this.checkSearchTerm(org)) {
			this.isSearchInvalid = false;			
			this.globalNavService.onOpenNewTab(org);
		} else {
			this.isSearchInvalid = true;
		}
	}

	openNewTab(tab: Tab) {
		this.tabs.push(tab);
		this.setActiveTab(this.tabs.length - 1);
		this.router.navigate([tab.url]);
	}

	closeTab(idx: number) {
		this.tabs.splice(idx, 1);

		if (idx - 1 >= 0) {
			this.activeTabIdx = idx - 1;
			this.router.navigate(["/" + this.tabs[idx - 1].url]);
		} else {
			this.activeTabIdx = 0;
			this.router.navigate(["home"]);
		}
	}

	onClickTab(idx: number) {
		this.setActiveTab(idx);
	}

	setActiveTab(idx: number) {
		this.tabs[this.activeTabIdx].isActive = false;

		this.tabs[idx].isActive = true;
		this.activeTabIdx = idx;
		console.log("active: " + idx);
	}

	checkNewTab() {
		return this.tabs.length === 0;
	}

	checkSearchTerm(username: string): boolean {
		/*
		 * Criteria according to the "join Github" page: 
		 * Github username may only contain alphanumeric characters or hyphens.
		 * Github username cannot have multiple consecutive hyphens.
		 * Github username cannot begin or end with a hyphen.
		 * Maximum is 39 characters.
		*/

		return /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username);
	}

	concatURL(urlSegment: UrlSegment[]): string {
		let joinedURL = "";
		urlSegment.forEach(str => { joinedURL += str.toString() + "/" });
		joinedURL = joinedURL.substring(0, joinedURL.lastIndexOf("/"))

		return joinedURL;
	}
}
