import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Organization } from '../entities/organization';

import { DashboardService } from '../services/dashboard.service';
import { GlobalNavigationService } from '../services/global-navigation.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  orga: Organization;

  constructor(private service: DashboardService, private route: ActivatedRoute, private globalNavService: GlobalNavigationService) {
    let org = route.snapshot.paramMap.get('organization');
    this.orga = service.getOrganization(org);
  }

  ngOnInit() { 
    this.globalNavService.showNavBar(false);
  }

  ngOnDestroy() {   
    this.globalNavService.showNavBar(true);
  }

}
