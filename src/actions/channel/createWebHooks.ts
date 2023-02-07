import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const createWebHookAction = ({ channel, label }: channelTypes.ICreateWebHooksRequest) => {
	return async (dispatch: channelTypes.CreateWebHookDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_WEBHOOKS_CREATE_REQUEST, request: { channel, label } });

		const response = await api.post({ endpoint: 'client/channel/webhooks/create', body: { channel, label } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_WEBHOOKS_CREATE_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_WEBHOOKS_CREATE_FAILURE, data: response.data });
	};
};
