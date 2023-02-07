import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelMuteAction_Action = ({ channel }: channelTypes.IMuteActionRequest) => {
	return async (dispatch: channelTypes.MuteActionDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_MUTE_ACTION_REQUEST, request: { channel } });

		const response = await api.post({ endpoint: 'client/channel/mute/action', body: { channel } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_MUTE_ACTION_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_MUTE_ACTION_FAILURE, data: response.data });
	};
};
