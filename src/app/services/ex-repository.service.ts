import { Injectable } from '@angular/core';
import { Repository } from '../entities/repository';
import { EX_REPOSITORIES } from '../mock-data';
import { GlobalNavigationService } from './global-navigation.service';

@Injectable()
export class ExRepositoryService {

  exRepositories: Repository [] = EX_REPOSITORIES;
 
  constructor(private globalNavService: GlobalNavigationService) {
    globalNavService.tellNumOfEntities(this.exRepositories.length);
   }

  getExRepositories() {
    return this.exRepositories;
  }

}
