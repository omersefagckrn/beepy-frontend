import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelSettingsAction = ({ channel }: channelTypes.IChannelSettingsRequest) => {
	return async (dispatch: channelTypes.ChannelSettingsDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_SETTINGS_REQUEST, request: { channel } });

		const response = await api.post({ endpoint: 'client/channel/settings', body: { channel } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_SETTINGS_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_SETTINGS_FAILURE, data: response.data });
	};
};
