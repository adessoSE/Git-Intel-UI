import { Member } from "./member";
import { Repository } from "./repository";

export class Team {
    public name: string;
    public description: string;
    public repositories: Repository[];
    public members: Member[];
    public commits: number;
    // Avatar 

    // Optional weitere Details:
    // private license: string; ?
    // private pullRequests: number; ?
    // private issues: number; ?
}