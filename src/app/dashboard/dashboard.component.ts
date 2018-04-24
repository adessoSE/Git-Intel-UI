import { Component, OnInit } from '@angular/core';
import { ORGANIZATIONS } from '../mock-data';
import { Organization } from '../organization';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  orga: Organization = ORGANIZATIONS[0];

  constructor() {
   
  }

  ngOnInit() {
  }

}
