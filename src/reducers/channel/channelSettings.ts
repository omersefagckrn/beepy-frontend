import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelSettingsReducer = (state: channelTypes.ChannelSettingsState = initialState, action: channelTypes.ChannelSettingsAction): channelTypes.ChannelSettingsState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_SETTINGS_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_SETTINGS_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_SETTINGS_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
