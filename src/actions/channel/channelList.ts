import { ChannelsListTypes } from '../../@types/pages';
import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelListAction = (type: ChannelsListTypes.ChannelsStatus) => {
	return async (dispatch: channelTypes.ChannelListDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_LIST_REQUEST });

		const response = await api.post({ endpoint: type === ChannelsListTypes.ChannelsStatus.INACTIVE ? 'client/channel/list/inactive' : 'client/channel/list' });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_LIST_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_LIST_FAILURE, data: response.data });
	};
};
