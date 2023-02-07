import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const inviteAction = ({ guid, action }: accountTypes.IInviteActionsRequest) => {
	return async (dispatch: accountTypes.InviteActionsDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.INVITATION_ACTION_REQUEST, request: { guid, action } });

		const response = await api.post({ endpoint: 'client/account/invitation/action', body: { guid, action } });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.INVITATION_ACTION_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.INVITATION_ACTION_FAILURE, data: response.data });
	};
};
