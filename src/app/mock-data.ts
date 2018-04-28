import { Organization } from "./entities/organization";
import { Member } from "./entities/member";
import { Repository } from "./entities/repository";
import { Team } from "./entities/team";


export const ORGANIZATIONS: Organization[] = [
    {
        name: "adessoAG",
        description: "description..",
        location: "dortmund",
        website: "adesso.de",
        numOfMembers: 63,
        numOfTeams: 8,
        numOfRepos: 22,
        numOfExternalRepos: 4
    },
    {
        name: "microsoft",
        description: "description..",
        location: "la",
        website: "microsoft.de",
        numOfMembers: 500,
        numOfTeams: 89,
        numOfRepos: 222,
        numOfExternalRepos: 40
    }
];

export const MEMBERS: Member[] = [
    {
        username: "peter-mueller",
        name: 'Peter Müller',
        organization: ORGANIZATIONS[0],
        commits: 20,
        pullRequests: 3,
        issues: 2,
    },
    {
        username: "peter-mueller",
        name: 'Peter Müller',
        organization: ORGANIZATIONS[0],
        commits: 20,
        pullRequests: 3,
        issues: 2,
    },
    {
        username: "peter-mueller",
        name: 'Peter Müller',
        organization: ORGANIZATIONS[0],
        commits: 20,
        pullRequests: 3,
        issues: 2,
    },
    {
        username: "peter-mueller",
        name: 'Peter Müller',
        organization: ORGANIZATIONS[0],
        commits: 20,
        pullRequests: 3,
        issues: 2,
    },
    {
        username: "peter-mueller",
        name: 'Peter Müller',
        organization: ORGANIZATIONS[0],
        commits: 20,
        pullRequests: 3,
        issues: 2,
    },
    {
        username: "peter-mueller",
        name: 'Peter Müller',
        organization: ORGANIZATIONS[0],
        commits: 20,
        pullRequests: 3,
        issues: 2,
    }
];

export const REPOSITORIES: Repository[] = [
    {
        name: 'BrainySnake',
        description: 'Program your ai and compete against others',
        programmingLanguage: 'Java',
        license: 'MIT',
        numOfContributors: 5,
        stars: 7,
        commits: 156,
        pullRequests: 0,
        forks: 3,
        issues: 6
    },
    {
        name: 'BrainySnake2',
        description: 'Program your ai and compete against others',
        programmingLanguage: 'Java',
        license: 'MIT',
        numOfContributors: 5,
        stars: 7,
        commits: 156,
        pullRequests: 0,
        forks: 3,
        issues: 6
    },
    {
        name: 'GitStalker',
        description: 'Stalk organizations',
        programmingLanguage: 'TypeScript',
        license: 'MIT',
        numOfContributors: 3,
        stars: 2000,
        commits: 99,
        pullRequests: 0,
        forks: 3,
        issues: 6
    }
];

export const TEAMS: Team[] = [
    {
        name: "GitStalker",
        description: "Developing the coolest programm",
        repositories: REPOSITORIES.slice(2,2),
        members: MEMBERS.slice(0, 2),
        commits: 200
    },
    {
        name: "BrainySnake",
        description: "Developing the coolest programm",
        repositories: REPOSITORIES.slice(0,1),
        members: MEMBERS.slice(0, 2),
        commits: 200
    },
    {
        name: "BrainySnake2",
        description: "Developing the coolest programm",
        repositories: REPOSITORIES.slice(1,1),
        members: MEMBERS.slice(0, 2),
        commits: 200
    }
];