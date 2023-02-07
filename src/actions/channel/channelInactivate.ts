import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelInactivateAction = ({ channel }: channelTypes.IChannelInactivateRequest) => {
	return async (dispatch: channelTypes.ChannelInactivateDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_INACTIVATE_REQUEST, request: { channel } });

		const response = await api.post({ endpoint: 'client/channel/inactivate', body: { channel } });

		if (response.ok) return dispatch({ type: channelTypes.actionTypes.CHANNEL_INACTIVATE_SUCCESS, data: response.data });
		else dispatch({ type: channelTypes.actionTypes.CHANNEL_INACTIVATE_FAILURE, data: response.data });
	};
};
