import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelInvitationResendReducer = (state: channelTypes.InvitationResendState = initialState, action: channelTypes.InvitationResendAction): channelTypes.InvitationResendState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_INVITATION_RESEND_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_INVITATION_RESEND_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_INVITATION_RESEND_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
