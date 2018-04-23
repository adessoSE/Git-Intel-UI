import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  data: any;

  sortByToggle: string = 'commits';

  constructor() {
    // ==========TEST DATA=========
    this.data = {
      members: [
        {
          name: 'Peter Müller',
          commits: 20,
          pullRequests: 3,
          issues: 2,
        },
        {
          name: 'Walter Hobe',
          commits: 123,
          pullRequests: 9,
          issues: 1,
        },
        {
          name: 'Karl Thiesmann',
          commits: 12,
          pullRequests: 1,
          issues: 0,
        },
        {
          name: 'Klaus Klausen',
          commits: 30,
          pullRequests: 10,
          issues: 0,
        },
        {
          name: 'Hildegard Waber',
          commits: 0,
          pullRequests: 0,
          issues: 15,
        },
        {
          name: 'Marion Locke',
          commits: 56,
          pullRequests: 4,
          issues: 1,
        }
      ]
    };
    // ============================
  }

  ngOnInit() {
  }
}
