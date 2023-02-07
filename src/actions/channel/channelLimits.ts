import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelLimitsAction = ({ channel }: channelTypes.IChannelLimitsRequest ) => {
	return async (dispatch: channelTypes.ChannelLimitsDispatchType ) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_LIMITS_REQUEST, request: { channel } });

		const response = await api.post({ endpoint: 'client/channel/limits', body: { channel } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_LIMITS_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_LIMITS_FAILURE, data: response.data });
	};
};
