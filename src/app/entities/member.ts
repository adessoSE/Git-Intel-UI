import { Organization } from "./organization";
import { ChartJsData } from "./chartJS";

export class Member {
    public username: string;
    public name: string;
    public avatarURL: string;
    public githubURL: string;
    public organization: Organization;
    public amountPreviousCommits: number;
    public amountPreviousPullRequests: number;
    public amountPreviousIssues: number;
    public previousCommits: ChartJsData;
    public previousPullRequests: ChartJsData;
    public previousIssues: ChartJsData;
}