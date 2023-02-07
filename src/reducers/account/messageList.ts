import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const messageListReducer = (state: accountTypes.MessageListState = initialState, action: accountTypes.MessageListAction): accountTypes.MessageListState => {
	switch (action.type) {
		case accountTypes.actionTypes.MESSAGE_LIST_REQUEST:
			return {
				...state,
				...request()
			};
		case accountTypes.actionTypes.MESSAGE_LIST_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.MESSAGE_LIST_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
