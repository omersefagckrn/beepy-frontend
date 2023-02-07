import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelActivateAction = ({ channel }: channelTypes.IChannelActivateRequest) => {
	return async (dispatch: channelTypes.ChannelActivateDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_ACTIVATE_REQUEST, request: { channel } });

		const response = await api.post({ endpoint: 'client/channel/activate', body: { channel } });

		if (response.ok) return dispatch({ type: channelTypes.actionTypes.CHANNEL_ACTIVATE_SUCCESS, data: response.data });
		else dispatch({ type: channelTypes.actionTypes.CHANNEL_ACTIVATE_FAILURE, data: response.data });
	};
};
