import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelLimitsReducer = (state: channelTypes.ChannelLimitsState = initialState, action: channelTypes.ChannelLimitsAction ): channelTypes.ChannelLimitsState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_LIMITS_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_LIMITS_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_LIMITS_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
