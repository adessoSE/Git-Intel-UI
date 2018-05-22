import { Injectable } from '@angular/core';
import { Member } from '../entities/member';
import { MEMBERS } from '../mock-data';
import { GlobalNavigationService } from './global-navigation.service';

/**
 * Service for retrieving member data from GitHub using the 'GitStalker' library
 */
@Injectable()
export class MemberService {

  members: Member [] = MEMBERS;
  
  constructor(private globalNavService: GlobalNavigationService) {
    globalNavService.tellNumOfEntities(this.members.length);
   }

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
