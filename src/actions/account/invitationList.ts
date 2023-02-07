import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const invitationListAction = () => {
	return async (dispatch: accountTypes.InvitationListDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.INVITATION_LIST_REQUEST });

		const response = await api.post({ endpoint: 'client/account/invitation/list' });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.INVITATION_LIST_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.INVITATION_LIST_FAILURE, data: response.data });
	};
};
