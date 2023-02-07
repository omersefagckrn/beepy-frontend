import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const createWebHookReducer = (state: channelTypes.CreateWebHooksState = initialState, action: channelTypes.CreateWebHooksAction): channelTypes.CreateWebHooksState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_WEBHOOKS_CREATE_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_WEBHOOKS_CREATE_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_WEBHOOKS_CREATE_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
