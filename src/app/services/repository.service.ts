import { Injectable } from '@angular/core';

@Injectable()
export class RepositoryService {

  // ==========TEST DATA=========
  data = {
    repositories: [
      {
        name: 'BrainySnake',
        description: 'Program your ai and compete against others',
        commits: 156,
        pullRequests: 0,
        issues: 6,
        stars: 7,
        forks: 3,
        license: 'MIT',
        languages: ['Java']
      },
      {
        name: 'Wicked Charts',
        description: 'Beautiful charts for your frontend application',
        commits: 400,
        pullRequests: 0,
        issues: 26,
        stars: 58,
        forks: 35,
        license: 'Apache-2.0',
        languages: ['JavaScript', 'HTML', 'Java']
      },
      {
        name: 'GitStalker',
        description: 'Find out what GitHub organizations are up to',
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

  getRepositories() {
    return this.data;
  }

}
