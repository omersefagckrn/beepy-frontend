import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const invitationListReducer = (state: accountTypes.InvitationsListState = initialState, action: accountTypes.InvitationListAction): accountTypes.InvitationsListState => {
	switch (action.type) {
		case accountTypes.actionTypes.INVITATION_LIST_REQUEST:
			return {
				...state,
				...request()
			};
		case accountTypes.actionTypes.INVITATION_LIST_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.INVITATION_LIST_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
