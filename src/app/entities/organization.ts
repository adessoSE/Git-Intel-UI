import { ChartJsData } from "./chartJS";
import { Repository } from "./repository";

export class Organization {
    public name: string;
    public description: string;
    public location: string;
    public websiteURL: string;
    public githubURL: string;
    public avatarURL: string;
    public numOfMembers: number;
    public numOfTeams: number;
    public numOfInternalRepos: number;
    public numOfExternalRepos: number;
    public lastUpdate: number;
    public memberGrowth: any;
    public externalRepositoriesPullRequests: any;
    public internalRepositoriesCommits: any;
    public createdReposByMembers: Repository [];
}