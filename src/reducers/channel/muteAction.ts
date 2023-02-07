import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const muteActionReducer = (state: channelTypes.MuteActionState = initialState, action: channelTypes.MuteAction_Action): channelTypes.MuteActionState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_MUTE_ACTION_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_MUTE_ACTION_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_MUTE_ACTION_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
