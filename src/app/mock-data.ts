import { Organization } from "./entities/organization";
import { Member } from "./entities/member";
import { Repository } from "./entities/repository";
import { Team } from "./entities/team";


export const ORGANIZATIONS: Organization[] = [
    {
        name: "adessoAG",
        description: "All hail adesso",
        location: "Dortmund",
        website: "adesso.de",
        numOfMembers: 63,
        numOfTeams: 8,
        numOfRepos: 22,
        numOfExternalRepos: 4
    },
    {
        name: "microsoft",
        description: "All hail Microsoft",
        location: "LA",
        website: "microsoft.de",
        numOfMembers: 500,
        numOfTeams: 89,
        numOfRepos: 222,
        numOfExternalRepos: 40
    }
];

export const MEMBERS: Member[] = [
    {
        username: "gbz",
        name: 'Sergej G',
        organization: ORGANIZATIONS[0],
        commits: 200,
        pullRequests: 1,
        issues: 7,
    },
    {
        username: "peter-mueller",
        name: 'Peter Müller',
        organization: ORGANIZATIONS[0],
        commits: 180,
        pullRequests: 3,
        issues: 11,
    },
    {
        username: "alfreed-mueller",
        name: 'Alfred Müller',
        organization: ORGANIZATIONS[0],
        commits: 50,
        pullRequests: 3,
        issues: 0,
    },
    {
        username: "jochen-schweizer",
        name: 'Jochen Schweizer',
        organization: ORGANIZATIONS[0],
        commits: 2,
        pullRequests: 13,
        issues: 2,
    },
    {
        username: "peter-pan",
        name: 'Peter Pan',
        organization: ORGANIZATIONS[0],
        commits: 0,
        pullRequests: 7,
        issues: 5,
    },
    {
        username: "dennis-zauener",
        name: 'Dennis Zäuner',
        organization: ORGANIZATIONS[0],
        commits: 20,
        pullRequests: 0,
        issues: 20,
    }
];

export const REPOSITORIES: Repository[] = [
    {
        name: 'BrainySnake',
        description: 'Program your ai and compete against others',
        programmingLanguage: 'Java',
        license: 'OpenLicense3',
        numOfContributors: 5,
        stars: 70,
        commits: 156,
        pullRequests: 1,
        forks: 1,
        issues: 2
    },
    {
        name: 'HelloWorld',
        description: 'test',
        programmingLanguage: 'Java',
        license: 'Apache2',
        numOfContributors: 5,
        stars: 5,
        commits: 2,
        pullRequests: 5,
        forks: 3,
        issues: 4
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
        forks: 43,
        issues: 6
    }
];

export const EX_REPOSITORIES: Repository[] = [
    {
        name: 'BrainySnake',
        description: 'Program your ai and compete against others',
        programmingLanguage: 'Java',
        license: 'OpenLicense3',
        numOfContributors: 5,
        stars: 70,
        commits: 156,
        pullRequests: 1,
        forks: 1,
        issues: 2
    },
    {
        name: 'HelloWorld',
        description: 'test',
        programmingLanguage: 'Java',
        license: 'Apache2',
        numOfContributors: 5,
        stars: 5,
        commits: 2,
        pullRequests: 5,
        forks: 3,
        issues: 4
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
        forks: 43,
        issues: 6
    }
];

export const TEAMS: Team[] = [
    {
        name: "GitStalker",
        description: "Developing the coolest programm",
        repositories: REPOSITORIES.slice(0, 2),
        members: MEMBERS.slice(0, 3),
        commits: 200
    },
    {
        name: "BrainySnake",
        description: "Developing the coolest programm",
        repositories: REPOSITORIES.slice(1, 2),
        members: MEMBERS.slice(2, 6),
        commits: 150
    },
    {
        name: "HelloWorld",
        description: "Developing helloworlds",
        repositories: REPOSITORIES.slice(0, 1),
        members: MEMBERS.slice(1, 2),
        commits: 20
    }
];