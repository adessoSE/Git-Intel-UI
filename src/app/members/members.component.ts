import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  data: any;

  sortByToggle: string = 'commits';

  constructor() { }

  ngOnInit() {
  }

 
}
