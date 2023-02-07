import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const messageListAction = ({ id = 1 }: { id: number }) => {
	return async (dispatch: accountTypes.MessageListDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.MESSAGE_LIST_REQUEST });

		const response = await api.post({ endpoint: 'client/account/message/list?page=' + id });
		// evet de burda paginate için page koyar mısın?

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.MESSAGE_LIST_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.MESSAGE_LIST_FAILURE, data: response.data });
	};
};
