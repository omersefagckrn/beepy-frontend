import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const messageReadReducer = (state: accountTypes.MessageReadState = initialState, action: accountTypes.MessageReadAction): accountTypes.MessageReadState => {
	switch (action.type) {
		case accountTypes.actionTypes.MESSAGE_READ_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case accountTypes.actionTypes.MESSAGE_READ_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.MESSAGE_READ_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
