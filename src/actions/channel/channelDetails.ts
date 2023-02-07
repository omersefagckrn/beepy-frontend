import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelDetailsAction = ({ channel }: channelTypes.IChannelDetailsRequest) => {
	return async (dispatch: channelTypes.ChannelDetailsDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_DETAILS_REQUEST, request: { channel } });

		const response = await api.post({ endpoint: 'client/channel/details', body: { channel } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_DETAILS_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_DETAILS_FAILURE, data: response.data });
	};
};
