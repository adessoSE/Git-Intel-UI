import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';
import { TeamsComponent } from './teams/teams.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { ExternalRepositoriesComponent } from './external-repositories/external-repositories.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'members', component: MembersComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'repositories', component: RepositoriesComponent },
  { path: 'external-repositories', component: ExternalRepositoriesComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
