import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const unreadMessageReducer = (state: accountTypes.MessageUnreadState = initialState, action: accountTypes.MessageUnreadAction): accountTypes.MessageUnreadState => {
	switch (action.type) {
		case accountTypes.actionTypes.MESSAGE_UNREAD_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case accountTypes.actionTypes.MESSAGE_UNREAD_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.MESSAGE_UNREAD_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
