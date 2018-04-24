import { Member } from "./member";
import { Repository } from "./repository";

export class Team {
    private name: string;
    private description: string;
    private repositories: Repository[];
    private members: Member[];
    private commits: number;
    // Avatar 

    // Optional weitere Details:
    // private license: string; ?
    // private pullRequests: number; ?
    // private issues: number; ?
}