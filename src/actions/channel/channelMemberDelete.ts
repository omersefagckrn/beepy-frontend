import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelMemberDeleteAction = ({ member }: channelTypes.IChannelMemberDeleteRequest) => {
	return async (dispatch: channelTypes.ChannelMemberDeleteDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_MEMBERS_DELETE_REQUEST, request: { member } });

		const response = await api.post({ endpoint: 'client/channel/members/delete', body: { member } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_MEMBERS_DELETE_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_MEMBERS_DELETE_FAILURE, data: response.data });
	};
};
