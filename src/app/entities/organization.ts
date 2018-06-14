import { ChartJS } from "./chartJS";

export class Organization {
    public id: string;
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
    public externalRepositories: ChartJS;
    public internalRepositories: ChartJS;
}