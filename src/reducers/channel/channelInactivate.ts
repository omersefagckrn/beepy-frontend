import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelInactivateReducer = (state: channelTypes.ChannelInactivateState = initialState, action: channelTypes.ChannelInactivateAction): channelTypes.ChannelInactivateState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_INACTIVATE_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_INACTIVATE_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_INACTIVATE_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
