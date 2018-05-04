import { Injectable } from '@angular/core';
import { Member } from '../entities/member';
import { MEMBERS } from '../mock-data';

/**
 * Service for retrieving member data from GitHub using the 'GitStalker' library
 */
@Injectable()
export class MemberService {

  members: Member [] = MEMBERS;
  
  constructor() { }

  getMembers() {
    return this.members;
  }

  getMemberDetails(usrname: string) {
    for (const member of this.members) {
      if (member.username === usrname) {
        return member;
      }
    }
  }

}
