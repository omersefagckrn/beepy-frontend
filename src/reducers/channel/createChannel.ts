import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const createChannelReducer = (state: channelTypes.CreateChannelState = initialState, action: channelTypes.CreateChannelAction): channelTypes.CreateChannelState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_CREATE_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_CREATE_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_CREATE_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
