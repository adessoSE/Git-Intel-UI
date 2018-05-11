import { Component, OnInit } from '@angular/core';
import { Repository } from '../entities/repository';
import { RepositoryService } from '../services/repository.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  repositories: Repository [];
  orgName: string = "";
  sortByToggle: string = 'Members';

  constructor(
    private repoService: RepositoryService,
    private activeRoute: ActivatedRoute,
    private router: Router) {

    this.repositories = repoService.getRepositories();
    router.events.subscribe((val) => { this.orgName = this.activeRoute.snapshot.paramMap.get('organization'); });
  }

  ngOnInit() {
  }

}
