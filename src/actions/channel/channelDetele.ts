import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelDeleteAction = ({ channel }: channelTypes.IChannelDeleteRequest) => {
	return async (dispatch: channelTypes.ChannelDeleteDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_DELETE_REQUEST, request: { channel } });

		const response = await api.post({ endpoint: 'client/channel/delete', body: { channel } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_DELETE_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_DELETE_FAILURE, data: response.data });
	};
};
