import { Organization } from "./organization";
import { ChartJS } from "./chartJS";

export class Member {
    public username: string;
    public name: string;
    public avatarURL: string;
    public githubURL: string;
    public organization: Organization;
    public commits: number;
    public pullRequests: number;
    public issues: number;
    public previousCommits: ChartJS;
    public previousPullRequests: ChartJS;
    public previousIssues: ChartJS;
}