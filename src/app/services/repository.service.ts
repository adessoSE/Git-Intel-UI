import { Injectable } from '@angular/core';
import { Repository } from '../entities/repository';
import { REPOSITORIES } from '../mock-data';
import { GlobalNavigationService } from './global-navigation.service';

@Injectable()
export class RepositoryService {

  repositories: Repository [] = REPOSITORIES;

  constructor(private globalNavService: GlobalNavigationService) {
    globalNavService.tellNumOfEntities(this.repositories.length);
   }

  getRepositories() {
    return this.repositories;
  }

}
