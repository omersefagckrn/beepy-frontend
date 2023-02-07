import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelActivateReducer = (state: channelTypes.ChannelActivateState = initialState, action: channelTypes.ChannelActivateAction): channelTypes.ChannelActivateState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_ACTIVATE_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_ACTIVATE_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_ACTIVATE_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
