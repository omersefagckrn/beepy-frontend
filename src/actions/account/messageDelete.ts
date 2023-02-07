import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const deleteMessageAction = ({ message }: accountTypes.IDeleteMessageRequest) => {
	return async (dispatch: accountTypes.DeleteMessageDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.MESSAGE_DELETE_REQUEST, request: { message } });

		const response = await api.post({ endpoint: 'client/account/message/delete', body: { message } });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.MESSAGE_DELETE_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.MESSAGE_DELETE_FAILURE, data: response.data });
	};
};
