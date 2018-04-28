import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Organization } from '../entities/organization';

import { DashboardService } from '../services/dashboard.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  orga: Organization;

  constructor(service: DashboardService, private route: ActivatedRoute) {
    let org = route.snapshot.paramMap.get('organization');
    console.log(org);
    this.orga = service.getOrganization(org);
  }

  ngOnInit() {
  }

}
