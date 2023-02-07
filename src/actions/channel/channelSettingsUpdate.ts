import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelSettingsUpdateAction = ({ channel, muteable, display_logo, invitations_notify }: channelTypes.IChannelSettingsUpdateRequest) => {
	return async (dispatch: channelTypes.ChannelSettingsUpdateDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_SETTINGS_UPDATE_REQUEST, request: { channel, muteable, display_logo, invitations_notify } });

		const response = await api.post({ endpoint: 'client/channel/settings/update', body: { channel, muteable, display_logo, invitations_notify } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_SETTINGS_UPDATE_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_SETTINGS_UPDATE_FAILURE, data: response.data });
	};
};
