import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelMembersAction = ({ channel }: channelTypes.IChannelMembersRequest ) => {
	return async (dispatch: channelTypes.ChannelMembersDispatchType ) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_MEMBERS_REQUEST, request: { channel } });

		const response = await api.post({ endpoint: 'client/channel/members', body: { channel } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_MEMBERS_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_MEMBERS_FAILURE, data: response.data });
	};
};
