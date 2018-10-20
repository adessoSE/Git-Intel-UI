import { Member } from "./member";

export class Repository {
    public name: string;
    public description: string;
    public programmingLanguage: string;
    public license: string;
    public numOfContributors: number;
    public stars: number;
    public previousCommits: any;
    public previousPullRequests: any;
    public forks: number;
    public previousIssues: any;
    public contributor: Member[];
    public githubURL: string;
}