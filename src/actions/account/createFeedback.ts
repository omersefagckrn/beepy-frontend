import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const createFeedbackAction = ({ type, subject, message }: accountTypes.ICreateFeedBackRequest) => {
	return async (dispatch: accountTypes.CreateFeedbackDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.CREATE_FEEDBACK_REQUEST, request: { type, subject, message } });

		const response = await api.post({ endpoint: 'client/account/feedback/create', body: { type, subject, message } });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.CREATE_FEEDBACK_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.CREATE_FEEDBACK_FAILURE, data: response.data });
	};
};
