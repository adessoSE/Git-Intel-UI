import { Organization } from "./organization";
import { ChartJsContent } from "./chartJS";

export class Member {
    public username: string;
    public name: string;
    public avatarURL: string;
    public githubURL: string;
    public organization: Organization;
    public commits: number;
    public pullRequests: number;
    public issues: number;
    public previousCommits: ChartJsContent;
    public previousPullRequests: ChartJsContent;
    public previousIssues: ChartJsContent;
}