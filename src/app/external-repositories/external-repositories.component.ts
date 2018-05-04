import { Component, OnInit } from '@angular/core';
import { Repository } from '../entities/repository';
import { ExRepositoryService } from '../services/ex-repository.service';

@Component({
  selector: 'app-external-repositories',
  templateUrl: './external-repositories.component.html',
  styleUrls: ['./external-repositories.component.css']
})
export class ExternalRepositoriesComponent implements OnInit {

  extRepos: Repository [];

  constructor(extRepoService: ExRepositoryService) { 
    this.extRepos = extRepoService.getExRepositories();
  }

  ngOnInit() {
  }

}
