import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelInvitationListAction = ({ channel }: channelTypes.IChannelInvitationListRequest) => {
	return async (dispatch: channelTypes.ChannelInvitationListDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_INVITATION_LIST_REQUEST, request: { channel } });

		const response = await api.post({ endpoint: 'client/channel/invitation/list', body: { channel } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_INVITATION_LIST_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_INVITATION_LIST_FAILURE, data: response.data });
	};
};
