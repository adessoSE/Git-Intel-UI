import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalRepositoriesComponent } from './external-repositories.component';

describe('ExternalRepositoriesComponent', () => {
  let component: ExternalRepositoriesComponent;
  let fixture: ComponentFixture<ExternalRepositoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalRepositoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
