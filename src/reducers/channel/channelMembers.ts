import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelMembersReducer = (state: channelTypes.ChannelMembersState = initialState, action: channelTypes.ChannelMembersAction): channelTypes.ChannelMembersState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_MEMBERS_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_MEMBERS_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_MEMBERS_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
