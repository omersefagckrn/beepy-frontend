import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const getWhiteListReducer = (state: channelTypes.WhiteListState = initialState, action: channelTypes.WhiteListAction): channelTypes.WhiteListState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_WHITELIST_GET_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_WHITELIST_GET_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_WHITELIST_GET_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
