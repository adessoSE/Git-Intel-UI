import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';
import { TeamsComponent } from './teams/teams.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { ExternalRepositoriesComponent } from './external-repositories/external-repositories.component';
import { MemberComponent } from './member/member.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'members', component: MembersComponent },
  { path: 'member/:username', component: MemberComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'repositories', component: RepositoriesComponent },
  { path: 'external-repositories', component: ExternalRepositoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
