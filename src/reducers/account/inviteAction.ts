import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const inviteActionReducer = (state: accountTypes.InviteActionState = initialState, action: accountTypes.InviteActionAction): accountTypes.InviteActionState => {
	switch (action.type) {
		case accountTypes.actionTypes.INVITATION_ACTION_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case accountTypes.actionTypes.INVITATION_ACTION_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.INVITATION_ACTION_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
