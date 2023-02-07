import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelDeleteReducer = (state: channelTypes.ChannelDeleteState = initialState, action: channelTypes.ChannelDeleteAction): channelTypes.ChannelDeleteState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_DELETE_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_DELETE_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_DELETE_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
