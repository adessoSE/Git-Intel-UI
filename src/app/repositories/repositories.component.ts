import { Component, OnInit } from '@angular/core';
import { Repository } from '../entities/repository';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  repositories: Repository [];
  sortByToggle: string = 'Members';

  constructor(repoService: RepositoryService) {
    this.repositories = repoService.getRepositories();
  }

  ngOnInit() {
  }

}
