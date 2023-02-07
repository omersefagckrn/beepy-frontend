import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const webHooksGetAction = ({ channel }: channelTypes.IWebHooksGetRequest) => {
	return async (dispatch: channelTypes.WebHookDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_WEBHOOKS_GET_REQUEST, request: { channel } });

		const response = await api.post({ endpoint: 'client/channel/webhooks/get', body: { channel } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_WEBHOOKS_GET_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_WEBHOOKS_GET_FAILURE, data: response.data });
	};
};
