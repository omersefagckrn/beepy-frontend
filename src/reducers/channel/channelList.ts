import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelListReducer = (state: channelTypes.ChannelListState = initialState, action: channelTypes.ChannelListAction): channelTypes.ChannelListState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_LIST_REQUEST:
			return {
				...state,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_LIST_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_LIST_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
