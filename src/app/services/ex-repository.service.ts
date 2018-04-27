import { Injectable } from '@angular/core';

@Injectable()
export class ExRepositoryService {

  // ==========TEST DATA=========
  data = {
    repositories: [
      {
        name: 'External Repo #1',
        description: 'This is a nice and informative description',
        commits: 156,
        pullRequests: 0,
        issues: 6,
        stars: 7,
        forks: 3,
        license: 'MIT',
        languages: ['Java']
      },
      {
        name: 'External Repo #2',
        description: 'This is a nice and informative description',
        commits: 400,
        pullRequests: 0,
        issues: 26,
        stars: 58,
        forks: 35,
        license: 'Apache-2.0',
        languages: ['JavaScript', 'HTML', 'Java']
      },
      {
        name: 'External Repo #3',
        description: 'This is a nice and informative description',
        commits: 47,
        pullRequests: 0,
        issues: 3,
        stars: 0,
        forks: 0,
        license: 'MIT',
        languages: ['TypeScript']
      }
    ]
  };
  // ============================

  constructor() { }

  getExRepositories() {
    return this.data;
  }

}
