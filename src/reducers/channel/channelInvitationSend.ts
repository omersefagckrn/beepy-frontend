import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelInvitationSendReducer = (state: channelTypes.InvitationSendState = initialState, action: channelTypes.InvitationSendAction): channelTypes.InvitationSendState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_INVITATION_SEND_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_INVITATION_SEND_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_INVITATION_SEND_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
