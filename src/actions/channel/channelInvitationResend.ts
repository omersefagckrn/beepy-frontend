import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelInvitationResenAction = ({ guid }: channelTypes.IInvitationResendRequest) => {
	return async (dispatch: channelTypes.InvitationResendDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_INVITATION_RESEND_REQUEST, request: { guid } });

		const response = await api.post({ endpoint: 'client/channel/invitation/resend', body: { guid } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_INVITATION_RESEND_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_INVITATION_RESEND_FAILURE, data: response.data });
	};
};
