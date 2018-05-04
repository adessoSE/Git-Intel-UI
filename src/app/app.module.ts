import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';
import { TeamsComponent } from './teams/teams.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { ExternalRepositoriesComponent } from './external-repositories/external-repositories.component';
import { MemberComponent } from './member/member.component';
import { HomeComponent } from './home/home.component';

import { MemberService } from './services/member.service';
import { TeamService } from './services/team.service';
import { RepositoryService } from './services/repository.service';
import { ExRepositoryService } from './services/ex-repository.service';
import { DashboardService } from './services/dashboard.service';
import { GlobalNavigationService } from './services/global-navigation.service';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MembersComponent,
    TeamsComponent,
    RepositoriesComponent,
    ExternalRepositoriesComponent,
    MemberComponent,
    HomeComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    MemberService,
    TeamService,
    RepositoryService,
    ExRepositoryService,
    DashboardService,
    GlobalNavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
