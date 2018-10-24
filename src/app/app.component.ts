import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
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
	isHome: boolean = false;

	tabs = new Array<Tab>();
	activeTabIdx: number = 0;

	/** 
	 * How Tab system work:
	 * 
	 * New Tabs are opened under specific conditions 
	 * and are stored in the @tabs Array. 
	 * 
	 * The currently active Tab is referenced via @activeTabIdx 
	 * and stores the latest route until a new Tab is marked as active.
	 * 
	 * A new Tab is opened if: 
	 *     - There are no open Tabs (e.g. if all are closed, 
	 *     or the user directly navigates to a URL)
	 *     - There's a request triggered by
	 *         - the global searchForm 
	 *         - HomeComponents searchHistory
	 * 
	 * A Tab is marked as active if:
	 *     - It's a newly opened Tab.
	 *     - It's clicked on to.
	 *     - It's displayed because another Tab was closed.
	 * 
	 * In case the URL is "/home", no Tab is active.
	 */

	constructor(
		private globalNavService: GlobalNavigationService,
		private router: Router,
		private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		/*
		 * Subscribes to "open a new Tab" requests, e.g. from HomeComponents
		 * searchHistory.
		 */
		this.globalNavService.onOpenNewTabEmitter.subscribe((tab) => {
			if (tab !== null && tab.org !== "home")
				this.openNewTab(tab)
		});

		/**
		 * Subscription returns an Array of Objects that look like so:
		 *     Object { path: "1. URL segment", parameters: {} }
		 *     Object { path: "2. URL segment", parameters: {} }
		 *     ...
		 * 
		 * The final URL is concatenated and if conditions are met, 
		 * opened in a new tab, or otherwise assigned to the active tab. 
		 * 
		 * This procedure might be simplified.
		 */
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
					this.isHome = false;
				}
				else {
					this.isHome = true;
				}
			});
	}

	/**
	 * Triggered by the search/stalk-button, the method
	 * checks if the entered term is a legit Github username
	 * and displays hint and a warning in case not.  
	 */
	onClickStalk(org: string) {
		if (this.checkSearchTerm(org)) {
			this.isSearchInvalid = false;
			this.globalNavService.onOpenNewTab(org);
			// Clear input field
			this.organization = null;
		} else {
			this.isSearchInvalid = true;
		}
	}

	/**
	 * Pushes Tab into the global @tabs Array, hence opens it, marks it as active and navigates to given route. 
	 * Validations if the new Tab _should be_ opened are performed previously. 
	 */
	openNewTab(tab: Tab) {
		this.tabs.push(tab);
		this.setActiveTab(this.tabs.length - 1);
		this.router.navigate([tab.url]);
		console.log(this.activeTabIdx);
	}

	/** 
	 * Removes Tab from global @tabs Array, hence closes it.
	 * Assigns @activeTabIdx to Tab left of the previously closed, if there's more than one
	 * or navigates to "/home" otherwise.
	 */
	closeTab(idx: number) {
		this.tabs.splice(idx, 1);
		if (this.activeTabIdx == idx) {
			// Check if more than one tab is open
			if (idx - 1 >= 0) {
				this.activeTabIdx = idx - 1;
				this.router.navigate(["/" + this.tabs[idx - 1].url]);
			} else {
				this.activeTabIdx = 0;
				this.router.navigate(["home"]);
			}
		}
		// If the active tab is 'right to' the closing tab, adjust indices 
		if (this.activeTabIdx > idx) {
			this.activeTabIdx = this.tabs.length - 1;
		}
		// If it's to the left, do nothing to keep the active tab active
	}

	/** 
	 * Assigns @activeTabIdx to index of given Tab. 
	 */
	setActiveTab(idx: number) {
		this.activeTabIdx = idx;
	}

	/** 
	 * Validates given conditions if a new Tab should be opened. 
	 */
	checkNewTab() {
		return this.tabs.length === 0;
	}

	/** 
	 * Checks given username according to following criteria
	 * as provided by the official "Join Github" page:
	 *  
	 * Github username may only contain alphanumeric characters or hyphens.
	 * Github username cannot have multiple consecutive hyphens.
	 * Github username cannot begin or end with a hyphen.
	 * Maximum is 39 characters.
	*/
	checkSearchTerm(username: string): boolean {
		return /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(username);
	}

	/** 
	 * Concatenates the given UrlSegment seperated by "/"
	 * and removes the last one.
	 */
	concatURL(urlSegment: UrlSegment[]): string {
		let joinedURL = "";
		urlSegment.forEach(str => { joinedURL += str.toString() + "/" });
		joinedURL = joinedURL.substring(0, joinedURL.lastIndexOf("/"))

		return joinedURL;
	}
}
