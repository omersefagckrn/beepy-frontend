import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const messageReadAction = ({ message }: accountTypes.IMessageReadReuquest) => {
	return async (dispatch: accountTypes.MessageReadDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.MESSAGE_READ_REQUEST , request: { message }});

		const response = await api.post({ endpoint: 'client/account/message/read', body: { message } });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.MESSAGE_READ_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.MESSAGE_READ_FAILURE, data: response.data });
	};
};
