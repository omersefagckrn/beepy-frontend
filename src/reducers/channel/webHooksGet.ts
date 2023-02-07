import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const webHooksGetReducer = (state: channelTypes.WebHooksState = initialState, action: channelTypes.WebHookAction): channelTypes.WebHooksState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_WEBHOOKS_GET_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_WEBHOOKS_GET_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_WEBHOOKS_GET_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
