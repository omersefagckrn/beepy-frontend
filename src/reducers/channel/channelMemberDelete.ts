import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelMemberDeleteReducer = (state: channelTypes.ChannelMemberDeleteState = initialState, action: channelTypes.ChannelMemberDeleteAction): channelTypes.ChannelMemberDeleteState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_MEMBERS_DELETE_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_MEMBERS_DELETE_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_MEMBERS_DELETE_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
