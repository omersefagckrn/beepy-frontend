import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const deleteWebHookReducer = (state: channelTypes.DeleteWebHooksState = initialState, action: channelTypes.DeleteWebHooksAction): channelTypes.DeleteWebHooksState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_WEBHOOKS_DELETE_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_WEBHOOKS_DELETE_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_WEBHOOKS_DELETE_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
