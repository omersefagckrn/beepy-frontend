import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const whiteListGetAction = ({ channel }: channelTypes.IWhiteListGetRequest) => {
	return async (dispatch: channelTypes.WhiteListDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_WHITELIST_GET_REQUEST, request: { channel } });

		const response = await api.post({ endpoint: 'client/channel/whitelist/get', body: { channel } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_WHITELIST_GET_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_WHITELIST_GET_FAILURE, data: response.data });
	};
};
