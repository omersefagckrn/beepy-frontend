import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelInvitationSendAction = ({ channel, email }: channelTypes.IInvitationSendRequest) => {
	return async (dispatch: channelTypes.InvitationSendDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_INVITATION_SEND_REQUEST, request: { channel, email } });

		const response = await api.post({ endpoint: 'client/channel/invitation/send', body: { channel, email } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_INVITATION_SEND_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_INVITATION_SEND_FAILURE, data: response.data });
	};
};
