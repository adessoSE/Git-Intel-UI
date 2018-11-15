export class ProcessingOrganizationInfo {
    processingMessage: String;
    searchedOrganization: String;
    finishedRequestTypes: String[];
    missingRequestTypes: String[];
    totalCountOfRequestTypes: number;
    totalCountOfNeededRequests: number;
    currentPositionInQueue: number;
}
