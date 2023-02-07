import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const deleteWhiteListReducer = (state: channelTypes.DeleteWhiteListState = initialState, action: channelTypes.DeleteWhiteListAction): channelTypes.DeleteWhiteListState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_WHITELIST_DELETE_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_WHITELIST_DELETE_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_WHITELIST_DELETE_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
