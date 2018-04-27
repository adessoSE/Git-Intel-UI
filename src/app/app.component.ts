import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	
	searchPhrase: string = "";
	
	tabs = [
		{ link: "dashboard", label: "Home" },
	];

 
	openNewTab() {
		this.tabs.push(
			{ link: "dashboard", label: this.searchPhrase },
		)
	}

}
