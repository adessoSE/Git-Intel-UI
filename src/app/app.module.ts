import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { MembersComponent } from './members/members.component';
import { TeamsComponent } from './teams/teams.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { ExternalRepositoriesComponent } from './external-repositories/external-repositories.component';
import { MemberComponent } from './member/member.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MembersComponent,
    TeamsComponent,
    RepositoriesComponent,
    ExternalRepositoriesComponent,
    MemberComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
