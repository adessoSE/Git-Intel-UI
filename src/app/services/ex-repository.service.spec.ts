import { TestBed, inject } from '@angular/core/testing';

import { ExRepositoryService } from './ex-repository.service';

describe('ExRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExRepositoryService]
    });
  });

  it('should be created', inject([ExRepositoryService], (service: ExRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
