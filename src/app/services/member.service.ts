import { Injectable } from '@angular/core';

/**
 * Service for retrieving member data from GitHub using the 'GitStalker' library
 */
@Injectable()
export class MemberService {

  // ==========TEST DATA=========
  data = {
    members: [
      {
        name: 'Peter Müller',
        githubURL: 'https://github.com/pavestru',
        avatarURL: 'https://avatars0.githubusercontent.com/u/10186479?v=4',
        id: 0,
        commits: 20,
        pullRequests: 3,
        issues: 2,
      },
      {
        name: 'Walter Hobe',
        id: 1,
        commits: 123,
        pullRequests: 9,
        issues: 1,
      },
      {
        name: 'Karl Thiesmann',
        id: 2,
        commits: 12,
        pullRequests: 1,
        issues: 0,
      },
      {
        name: 'Klaus Klausen',
        id: 3,
        commits: 30,
        pullRequests: 10,
        issues: 0,
      },
      {
        name: 'Hildegard Waber',
        id: 4,
        commits: 0,
        pullRequests: 0,
        issues: 15,
      },
      {
        name: 'Marion Locke',
        id: 5,
        commits: 56,
        pullRequests: 4,
        issues: 1,
      }
    ]
  };
  // ============================

  constructor() { }

  getMembers() {
    return this.data;
  }

  getMemberDetails(id: number) {
    for (const member of this.data.members) {
      if (member.id === id) {
        return member;
      }
    }
  }

}
