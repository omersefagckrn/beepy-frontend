import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const addWhiteListAction = ({ channel, ip, label }: channelTypes.IAddWhiteListRequest) => {
	return async (dispatch: channelTypes.AddWhiteListDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_WHITELIST_ADD_REQUEST, request: { channel, ip, label } });

		const response = await api.post({ endpoint: 'client/channel/whitelist/add', body: { channel, ip, label } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_WHITELIST_ADD_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_WHITELIST_ADD_FAILURE, data: response.data });
	};
};
