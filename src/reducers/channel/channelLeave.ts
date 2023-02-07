import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelLeaveReducer = (state: channelTypes.ChannelLeaveState = initialState, action: channelTypes.ChannelLeaveAction): channelTypes.ChannelLeaveState => {
	switch (action.type) {
		case channelTypes.actionTypes.LEAVE_CHANNEL_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.LEAVE_CHANNEL_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.LEAVE_CHANNEL_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
