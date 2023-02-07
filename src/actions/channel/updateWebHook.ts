import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const updateWebHookAction = ({ webhook }: channelTypes.IUpdateWebHooksRequest) => {
	return async (dispatch: channelTypes.UpdateWebHookDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_WEBHOOKS_UPDATE_REQUEST, request: { webhook } });

		const response = await api.post({ endpoint: 'client/channel/webhooks/update', body: { webhook } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_WEBHOOKS_UPDATE_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_WEBHOOKS_UPDATE_FAILURE, data: response.data });
	};
};
