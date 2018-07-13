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
  cache: Set<Member> = new Set<Member>(); 
  
  constructor(private globalNavService: GlobalNavigationService) {
    globalNavService.tellNumOfEntities(this.members.length);
   }

  getMembers() {
    return this.members;
  }

  getMemberDetails(username: string) {
    for (let member of this.members) {
      if (member.username === username) {
        return member;
      }
    }
  }

}
