import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelDetailsUpdateReducer = (state: channelTypes.ChannelDetailsUpdateState = initialState, action: channelTypes.ChannelDetailsUpdateAction): channelTypes.ChannelDetailsUpdateState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_DETAILS_UPDATE_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_DETAILS_UPDATE_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_DETAILS_UPDATE_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
