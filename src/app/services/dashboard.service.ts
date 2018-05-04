import { Injectable } from '@angular/core';

import { ORGANIZATIONS } from '../mock-data';
import { Organization } from '../entities/organization';

@Injectable()
export class DashboardService {

  orgas: Organization [] = ORGANIZATIONS;

  constructor() {
   
  }

  getOrganization(name: string) {
    var org = this.orgas.find(function (org) { return org.name.toLocaleLowerCase === name.toLocaleLowerCase});

    var index = this.orgas.indexOf(org, 0);

    this.orgas.slice(index, 1);
    
    return org;
  }



}
