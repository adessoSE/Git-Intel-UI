import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRepositoriesComponent } from './member-repositories.component';

describe('MemberRepositoriesComponent', () => {
  let component: MemberRepositoriesComponent;
  let fixture: ComponentFixture<MemberRepositoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRepositoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
