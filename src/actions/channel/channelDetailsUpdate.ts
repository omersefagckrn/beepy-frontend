import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelDetailsUpdateAction = ({ channel, title, description, category }: channelTypes.IChannelDetailsUpdateRequest) => {
	return async (dispatch: channelTypes.ChannelDetailsUpdateDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_DETAILS_UPDATE_REQUEST, request: { channel, title, description, category } });

		const response = await api.post({ endpoint: 'client/channel/details/update', body: { channel, title, description, category } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_DETAILS_UPDATE_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_DETAILS_UPDATE_FAILURE, data: response.data });
	};
};
