import { Injectable } from '@angular/core';
import { Repository } from '../entities/repository';
import { REPOSITORIES } from '../mock-data';

@Injectable()
export class RepositoryService {

  repositories: Repository [] = REPOSITORIES;

  constructor() { }

  getRepositories() {
    return this.repositories;
  }

}
