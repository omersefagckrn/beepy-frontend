import { reportTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const issueAction = ({ guid, type }: reportTypes.IIssueRequest) => {
	return async (dispatch: reportTypes.IssueDispatchType) => {
		dispatch({ type: reportTypes.actionTypes.ISSUE_REQUEST, request: { guid, type }});

		const response = await api.post({ endpoint: 'client/report/issue', body: { guid, type } });

		if (response.ok) return dispatch({ type: reportTypes.actionTypes.ISSUE_SUCCESS, data: response.data });
		else return dispatch({type: reportTypes.actionTypes.ISSUE_FAILURE, data: response.data });
	};
};
