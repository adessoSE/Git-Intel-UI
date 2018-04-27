import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	// alias the searchTerm 
	organization: string = "";

	// dynamic tabs
	tabs = [
		{ link: "home", label: "Home" }
	];

	// Issue: Empty queries 
	openNewTab() {
		this.tabs.push({ link: this.organization + "/dashboard", label: this.organization });
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
