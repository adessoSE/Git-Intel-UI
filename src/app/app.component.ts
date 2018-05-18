import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
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
export class AppComponent implements OnInit {

	organization: string = "";
	//tabss: Tab[] = [{ id: 0, org: "home", url: "/home" }];
	tabs = new Set<Tab>();
	route: string = "";
	isSearchInvalid: boolean = false;

	constructor(
		private globalNavService: GlobalNavigationService,
		private location: Location,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private elRef: ElementRef, private renderer: Renderer) { }

	ngOnInit() {
		this.globalNavService.onOpenNewTabEmitter.subscribe((tab) => { if (tab !== null && tab.org !== "home") this.openNewTab(tab) });

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
				// console.log(event)
				this.checkIfTabExists(event);
			});
	}

	onClickStalk(org: string) {
		this.globalNavService.onOpenNewTab(org);
	}

	openNewTab(tab: Tab) {
		if (this.checkSearchTerm(tab.org)) {
			this.isSearchInvalid = false;
			this.tabs.add(tab);
			this.router.navigate([tab.org]);
		}
		else {
			this.isSearchInvalid = true;
		}
	}

	closeTab(removeTab: Tab) {
		/*
		var idx = this.tabss.indexOf(removeTab);
		if (idx > 0) {
			this.tabss.splice(idx, 1);
			this.router.navigate(["/" + this.tabss[idx - 1].url]);
		}
		*/
		this.tabs.delete(removeTab);
		this.router.navigate(["/home"]);
	}

	// As of right now: useless 
	// Track tab
	onClickTab(focus: Tab) {
		let active = this.elRef.nativeElement.ownerDocument.activeElement;

		let parser = new DOMParser();
		let parsedHtml = parser.parseFromString(active, 'text/html');

		console.log(parsedHtml)



		console.log();
	}

	checkIfTabExists(urlSegment: UrlSegment[]) {
		/* FOR DEBUGGING: 
		console.log("path array: " + pathArray.toString());
		console.log("url set: ");
		this.tabss.forEach(e => { console.log(e.url) })
		console.log("*****")
		*/

		let targetURL = "";
		urlSegment.forEach(str => { targetURL += str.toString() + "/" });
		targetURL = targetURL.substring(0, targetURL.lastIndexOf("/"))

		/*	IF USING ARRAY OVER SET
		if (this.tabss.some(tab => tab.url !== uri)) {
			console.log(uri + " needs to be inserted")
			this.tabss.forEach(element => {
				console.log("current tabs: " + element.url);				
			});
			this.globalNavService.onOpenNewTab(uri);
		}
		*/

		let noMatch = true;
		this.tabs.forEach(element => {
			if (element.url === targetURL) {
				// console.log("Matched URL in Set: " + uri);
				noMatch = false;
			}
		})

		if (noMatch) {
			// console.log("Didn't match URL in Set: " + uri);
			this.globalNavService.onOpenNewTab(targetURL);
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
