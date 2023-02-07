import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const deleteMessageReducer = (state: accountTypes.DeleteMessageState = initialState, action: accountTypes.DeleteMessageAction): accountTypes.DeleteMessageState => {
	switch (action.type) {
		case accountTypes.actionTypes.MESSAGE_DELETE_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case accountTypes.actionTypes.MESSAGE_DELETE_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.MESSAGE_DELETE_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
