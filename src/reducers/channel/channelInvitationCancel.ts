import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const channelInvitationCancelReducer = (state: channelTypes.InvitationCancelState = initialState, action: channelTypes.InvitationCancelAction): channelTypes.InvitationCancelState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_INVITATION_CANCEL_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_INVITATION_CANCEL_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_INVITATION_CANCEL_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
