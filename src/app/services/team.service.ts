import { Injectable } from '@angular/core';

@Injectable()
export class TeamService {

  constructor() { }

  // ==========TEST DATA=========
  data = {
    teams: [
      {
        name: 'Frontend',
        description: 'Frontend developers working on angular applications',
        members: 18,
        repositories: 4,
        commits: 156
      },
      {
        name: 'Backend',
        description: 'Java developers for backend repos',
        members: 36,
        repositories: 6,
        commits: 336
      },
      {
        name: 'Open Source Projects',
        description: 'People working on the company\'s open source projects',
        members: 6,
        repositories: 2,
        commits: 80
      }
    ]
  };
  // ============================

  getTeams() {
    return this.data;
  }

}
