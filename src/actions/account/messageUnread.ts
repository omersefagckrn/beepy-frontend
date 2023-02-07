import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const unreadMessageAction = ({ message }: accountTypes.IMessageUnreadRequest) => {
	return async (dispatch: accountTypes.MessageUnreadDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.MESSAGE_UNREAD_REQUEST, request: { message } });

		const response = await api.post({ endpoint: 'client/account/message/unread', body: { message } });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.MESSAGE_UNREAD_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.MESSAGE_UNREAD_FAILURE, data: response.data });
	};
};
