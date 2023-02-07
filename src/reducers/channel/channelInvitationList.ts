import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelInvitationListReducer = (state: channelTypes.ChannelInvitationListState = initialState, action: channelTypes.ChannelInvitationListAction): channelTypes.ChannelInvitationListState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_INVITATION_LIST_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_INVITATION_LIST_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_INVITATION_LIST_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
