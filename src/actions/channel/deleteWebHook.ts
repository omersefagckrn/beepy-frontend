import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const deleteWebHookAction = ({ webhook }: channelTypes.IDeleteWebHooksRequest) => {
	return async (dispatch: channelTypes.DeleteWebHookDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_WEBHOOKS_DELETE_REQUEST, request: { webhook } });

		const response = await api.post({ endpoint: 'client/channel/webhooks/delete', body: { webhook } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_WEBHOOKS_DELETE_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_WEBHOOKS_DELETE_FAILURE, data: response.data });
	};
};
