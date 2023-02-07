import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const deleteWhiteListAction = ({ channel, ip }: channelTypes.IDeleteWhiteListRequest) => {
	return async (dispatch: channelTypes.DeleteWhiteListDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_WHITELIST_DELETE_REQUEST, request: { channel, ip } });

		const response = await api.post({ endpoint: 'client/channel/whitelist/delete', body: { channel, ip } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_WHITELIST_DELETE_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_WHITELIST_DELETE_FAILURE, data: response.data });
	};
};
