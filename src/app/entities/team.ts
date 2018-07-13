import { Member } from "./member";
import { Repository } from "./repository";

export class Team {
    public name: string;
    public description: string;
    public repositories: Repository[];
    public members: Member[];
    public commits: number;
    public avatarURL: string;
    public githubURL: string;
}