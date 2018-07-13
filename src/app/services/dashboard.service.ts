import { Injectable } from '@angular/core';

import { ORGANIZATIONS } from '../mock-data';
import { Organization } from '../entities/organization';

@Injectable()
export class DashboardService {

  orgas: Organization [] = ORGANIZATIONS;

  constructor() { }

  getOrganization(name: string) {
    var org = this.orgas.find(x => x.id.toLocaleLowerCase() === name.toLocaleLowerCase());

    return org;
  }



}
