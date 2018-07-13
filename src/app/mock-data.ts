import { Organization } from "./entities/organization";
import { Member } from "./entities/member";
import { Repository } from "./entities/repository";
import { Team } from "./entities/team";
import { ChartJsData, ChartJs } from "./entities/chartJS";

export const CHARTJS_DEFAULT: ChartJs = {
    chartTitle: "Member Growth",
    chartType: "line",
    chartLegend: true,
    chartOptions: {
        responsive: true
    },
    chartData: {
        data: [{ data: [2, 2, 1, 2], label: 'Pull Requests last 5 Days' }],
        labels: ['16/4/2018', '19/4/2018', '20/4/2018', '21/4/2018']
    },
    chartColors: [
        {
            backgroundColor: 'rgba(132, 179, 221, 0.2)',
            borderColor: '#428bca',
            pointBackgroundColor: 'rgba(225,10,24,0.2)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(225,10,24,0.2)'
        }
    ],
};

export const CHARTJS: ChartJsData[] = [
    {
        labels: ['15/4/2018', '16/4/2018', '17/4/2018', '18/4/2018', '19/4/2018', '20/4/2018', '21/4/2018'],
        data: [{ data: [2, 4, 5, 3, 3, 3, 0], label: 'Commits' }]
    },
    {
        labels: ['15/4/2018', '16/4/2018', '17/4/2018', '18/4/2018', '19/4/2018', '20/4/2018', '21/4/2018'],
        data: [{ data: [1, 1, 2, 3, 2, 3, 5], label: 'Issues' }]
    },
    {
        labels: ['15/4/2018', '16/4/2018', '17/4/2018', '18/4/2018', '19/4/2018', '20/4/2018', '21/4/2018'],
        data: [{ data: [0, 0, 5, 3, 2, 3, 1], label: 'Pull Requests' }]
    },
    {
        labels: ['15/4/2018', '16/4/2018', '17/4/2018', '18/4/2018', '19/4/2018', '20/4/2018', '21/4/2018'],
        data: [{ data: [10, 2, 5, 13, 2, 5, 1], label: 'Commits' }]
    },
    {
        labels: ['15/4/2018', '16/4/2018', '17/4/2018', '18/4/2018', '19/4/2018', '20/4/2018', '21/4/2018'],
        data: [{ data: [10, 12, 2, 3, 1, 0, 5], label: 'Pull Requests' }]
    },
    {
        labels: ['15/4/2018', '16/4/2018', '17/4/2018', '18/4/2018', '19/4/2018', '20/4/2018', '21/4/2018'],
        data: [{ data: [2, 4, 5, 3, 3, 3, 0], label: 'Members' }]
    }
];

export const ORGANIZATIONS: Organization[] = [
    {
        id: "adessoAG",
        description: "All hail adesso",
        location: "Dortmund",
        websiteURL: "adesso.de",
        githubURL: "github.com/adessoAG",
        avatarURL: "assets/adesso.png",
        numOfMembers: 63,
        numOfTeams: 8,
        numOfInternalRepos: 22,
        numOfExternalRepos: 4,
        lastUpdate: 1527235577893,
        internalRepositories: CHARTJS[3],
        externalRepositories: CHARTJS[4],
        memberGrowth: CHARTJS[5]
    },
    {
        id: "microsoft",
        description: "All hail Microsoft",
        location: "LA",
        websiteURL: "microsoft.de",
        githubURL: "github.com/microsoft",
        avatarURL: "assets/adesso.png",
        numOfMembers: 500,
        numOfTeams: 89,
        numOfInternalRepos: 222,
        numOfExternalRepos: 40,
        lastUpdate: 1527235577893,
        internalRepositories: CHARTJS[3],
        externalRepositories: CHARTJS[4],
        memberGrowth: CHARTJS[5]
    }
];

export const MEMBERS: Member[] = [
    {
        username: "s-gbz",
        name: 'Sergej G',
        organization: ORGANIZATIONS[0],
        commits: 200,
        pullRequests: 1,
        issues: 7,
        avatarURL: "assets/octocat.jpg",
        githubURL: "github.com/s-gbz",
        previousCommits: CHARTJS[0],
        previousIssues: CHARTJS[1],
        previousPullRequests: ChartJsData[2]
    },
    {
        username: "peter-mueller",
        name: 'Peter Müller',
        organization: ORGANIZATIONS[0],
        commits: 180,
        pullRequests: 3,
        issues: 11,
        avatarURL: "assets/octocat.jpg",
        githubURL: "github.com/s-gbz",
        previousCommits: CHARTJS[0],
        previousIssues: CHARTJS[1],
        previousPullRequests: ChartJsData[2]
    },
    {
        username: "john-doe",
        name: 'John Doe',
        organization: ORGANIZATIONS[0],
        commits: 10,
        pullRequests: 14,
        issues: 0,
        avatarURL: "assets/octocat.jpg",
        githubURL: "github.com/s-gbz",
        previousCommits: CHARTJS[0],
        previousIssues: CHARTJS[1],
        previousPullRequests: ChartJsData[2]
    },
    {
        username: "alfreed-mueller",
        name: 'Alfred Müller',
        organization: ORGANIZATIONS[0],
        commits: 50,
        pullRequests: 3,
        issues: 0,
        avatarURL: "assets/octocat.jpg",
        githubURL: "github.com/s-gbz",
        previousCommits: CHARTJS[0],
        previousIssues: CHARTJS[1],
        previousPullRequests: ChartJsData[2]
    },
    {
        username: "jochen-schweizer",
        name: 'Jochen Schweizer',
        organization: ORGANIZATIONS[0],
        commits: 2,
        pullRequests: 13,
        issues: 2,
        avatarURL: "assets/octocat.jpg",
        githubURL: "github.com/s-gbz",
        previousCommits: CHARTJS[0],
        previousIssues: CHARTJS[1],
        previousPullRequests: ChartJsData[2]
    },
    {
        username: "peter-pan",
        name: 'Peter Pan',
        organization: ORGANIZATIONS[0],
        commits: 0,
        pullRequests: 7,
        issues: 5,
        avatarURL: "assets/octocat.jpg",
        githubURL: "github.com/s-gbz",
        previousCommits: CHARTJS[0],
        previousIssues: CHARTJS[1],
        previousPullRequests: ChartJsData[2]
    },
    {
        username: "dennis-zauener",
        name: 'Dennis Zäuner',
        organization: ORGANIZATIONS[0],
        commits: 20,
        pullRequests: 0,
        issues: 20,
        avatarURL: "assets/octocat.jpg",
        githubURL: "github.com/s-gbz",
        previousCommits: CHARTJS[0],
        previousIssues: CHARTJS[1],
        previousPullRequests: ChartJsData[2]
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
        issues: 2,
        contributor: MEMBERS[0],
        githubURL: "github.com/brainysnake"
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
        issues: 4,
        contributor: MEMBERS[1],
        githubURL: "github.com/helloworld"
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
        issues: 6,
        contributor: MEMBERS[2],
        githubURL: "github.com/adessoag/gitstalkerbootstrapui"
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
        issues: 2,
        contributor: MEMBERS[0],
        githubURL: "github.com/brainysnake"
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
        issues: 4,
        contributor: MEMBERS[1],
        githubURL: "github.com/helloworld"
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
        issues: 6,
        contributor: MEMBERS[2],
        githubURL: "github.com/adessoag/gitstalkerbootstrapui"
    }
];

export const TEAMS: Team[] = [
    {
        name: "GitStalker",
        description: "Developing the coolest programm",
        repositories: REPOSITORIES.slice(0, 2),
        members: MEMBERS.slice(0, 3),
        commits: 200,
        avatarURL: "assets/octocat.jpg",
        githubURL: "github.com/teams/brainysnake"

    },
    {
        name: "BrainySnake",
        description: "Developing the coolest programm",
        repositories: REPOSITORIES.slice(1, 2),
        members: MEMBERS.slice(2, 6),
        commits: 150,
        avatarURL: "assets/octocat.jpg",
        githubURL: "github.com/teams/brainysnake"

    },
    {
        name: "HelloWorld",
        description: "Developing helloworlds",
        repositories: REPOSITORIES.slice(0, 1),
        members: MEMBERS.slice(1, 2),
        commits: 20,
        githubURL: "github.com/teams/helloworld",
        avatarURL: "assets/octocat.jpg"
    }
];