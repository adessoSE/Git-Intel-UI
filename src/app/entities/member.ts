import { Organization } from "./organization";

export class Member {
    public username: string;
    public name: string;
    public organization: Organization;
    public commits: number;
    public pullRequests: number;
    public issues: number;
    // Avatar 

    // Optional weitere Details:
    // private bio: string;
}