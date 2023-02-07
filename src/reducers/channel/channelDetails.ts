import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelDetailsReducer = (state: channelTypes.ChannelDetailsState = initialState, action: channelTypes.ChannelDetailsAction): channelTypes.ChannelDetailsState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_DETAILS_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_DETAILS_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_DETAILS_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
