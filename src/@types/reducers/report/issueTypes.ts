import { BaseState, IDataFail } from '../rootReducer';

export interface IIssueFail {
    status: boolean;
    requirement: null | string;   
}
export interface IIssueRequest {
    guid: string;
    type: string;
}
export type IssueState = {
    isLoading: boolean;
	error: boolean;
	success: boolean;
    data?: any | IIssueFail;
    request?: IIssueRequest;
}
export type IssueAction = {
    type: string;
    data?: any | IIssueFail;
    request?: IIssueRequest;
}
export type IssueDispatchType = (args: IssueAction) => IssueAction;