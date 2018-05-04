import { HomeComponent } from './home/home.component';

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { GlobalNavigationService } from './services/global-navigation.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
	/* 
	@organization - Is the user entered search term
	@showNavigation - Display navigation bar everywhere except home
	@tabs - Manages dynamic tabs
	*/
	organization: string = "";		
	showNavigation: boolean = false;
	tabs = [ { link: "home", label: "Home" } ];
	
	constructor(private location: Location, private router: Router, private globalNavService: GlobalNavigationService) { 
		this.globalNavService.onOpenNewTabEmitter.subscribe((tab) => {
			if( tab !== "" ) this.openNewTab(tab);
		});
	}

	ngOnInit() { }

	onComponentActivate(event) {
		this.showNavigation = (event instanceof HomeComponent) ? false : true;
	}

	// Will be possibly removed
	onComponentDeactivate(event) { }

	// Issue: Empty queries 
	openNewTab(orga: string): void {
		this.tabs.push({ link: orga, label: orga });
		this.router.navigate(["/"+ orga]);
	}

	/* Known issue: 
	 	Trying to close a tab with multiple instances
		of the same name only closes the first one,
		because it's the first result of tabs.find
	*/
	closeTab(tabName: string) {
		// Find object id to get index
		var obj = this.tabs.find(function (obj) { return obj.label === tabName });

		var index = this.tabs.indexOf(obj, 0);

		this.tabs.splice(index, 1);
	}

	

}
