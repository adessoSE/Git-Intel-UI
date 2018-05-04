import { Injectable } from '@angular/core';
import { Repository } from '../entities/repository';
import { EX_REPOSITORIES } from '../mock-data';

@Injectable()
export class ExRepositoryService {

  exRepositories: Repository [] = EX_REPOSITORIES;
 
  constructor() { }

  getExRepositories() {
    return this.exRepositories;
  }

}
