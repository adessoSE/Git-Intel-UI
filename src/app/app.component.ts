import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	searchPhrase: string = "";

	tabs = [
		{ link: "home", label: "Home" }
	];


	openNewTab() {
		this.tabs.push({ link: "dashboard", label: this.searchPhrase });
	}

	closeTab(tabName: string) {
		// Find object id to get index
		var obj = this.tabs.find(function (obj) { return obj.label === tabName });

		var index = this.tabs.indexOf( obj, 0);
		
		this.tabs.splice(index, 1);
		}


}
