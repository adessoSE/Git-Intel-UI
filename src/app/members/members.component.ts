import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { Member } from '../entities/member';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member [];
  sortByToggle: string = 'commits';

  constructor(memberService: MemberService) { 
    this.members = memberService.getMembers();
  }

  ngOnInit() {
  }

 
}
