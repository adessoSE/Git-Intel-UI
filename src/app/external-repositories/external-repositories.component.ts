import { Component, OnInit } from '@angular/core';
import { Repository } from '../entities/repository';
import { ExRepositoryService } from '../services/ex-repository.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-external-repositories',
  templateUrl: './external-repositories.component.html',
  styleUrls: ['./external-repositories.component.css']
})
export class ExternalRepositoriesComponent implements OnInit {

  extRepos: Repository[];
  orgName: string = "";

  constructor(
    private extRepoService: ExRepositoryService,
    private activeRoute: ActivatedRoute,
    private router: Router) {

    this.extRepos = extRepoService.getExRepositories();
    router.events.subscribe((val) => { this.orgName = this.activeRoute.snapshot.paramMap.get('organization'); });
  }

  ngOnInit() {
  }
}
