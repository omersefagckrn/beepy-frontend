import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const addWhiteListReducer = (state: channelTypes.AddWhiteListState = initialState, action: channelTypes.AddWhiteListAction): channelTypes.AddWhiteListState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_WHITELIST_ADD_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_WHITELIST_ADD_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_WHITELIST_ADD_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
