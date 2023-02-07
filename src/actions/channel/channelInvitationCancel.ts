import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelInvitationCancelAction = ({ guid }: channelTypes.IInvitationCancelRequest) => {
	return async (dispatch: channelTypes.InvitationCancelDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_INVITATION_CANCEL_REQUEST, request: { guid } });

		const response = await api.post({ endpoint: 'client/channel/invitation/cancel', body: { guid } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_INVITATION_CANCEL_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_INVITATION_CANCEL_FAILURE, data: response.data });
	};
};
