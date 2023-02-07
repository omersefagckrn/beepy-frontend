import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const channelLeaveAction = ({ channel }: channelTypes.IChannelLeaveRequest ) => {
	return async (dispatch: channelTypes.ChannelLeaveDispatchType ) => {
		dispatch({ type: channelTypes.actionTypes.LEAVE_CHANNEL_REQUEST, request: { channel } });

		const response = await api.post({ endpoint: 'client/channel/leave', body: { channel } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.LEAVE_CHANNEL_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.LEAVE_CHANNEL_FAILURE, data: response.data });
	};
};
