import { reportTypes } from "../../@types/reducers"; 
import { initialState, request, success, failure } from '../rootReducer';

export const issueReducer = (
    state: reportTypes.IssueState = initialState,
    action: reportTypes.IssueAction,
): reportTypes.IssueState => {
    switch(action.type)
    {
        case reportTypes.actionTypes.ISSUE_REQUEST:
            return {
                ...state,
                ...request(),
                request: action.request
            }
        case reportTypes.actionTypes.ISSUE_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case reportTypes.actionTypes.ISSUE_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state;
}