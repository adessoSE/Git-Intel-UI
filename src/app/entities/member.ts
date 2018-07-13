import { Organization } from "./organization";
import { ChartJsData } from "./chartJS";

export class Member {
    public username: string;
    public name: string;
    public avatarURL: string;
    public githubURL: string;
    public organization: Organization;
    public commits: number;
    public pullRequests: number;
    public issues: number;
    public previousCommits: ChartJsData;
    public previousPullRequests: ChartJsData;
    public previousIssues: ChartJsData;
}