import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const createFeedbackReducer = (state: accountTypes.CreateFeedbackState = initialState, action: accountTypes.CreateFeedbackAction): accountTypes.CreateFeedbackState => {
	switch (action.type) {
		case accountTypes.actionTypes.CREATE_FEEDBACK_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case accountTypes.actionTypes.CREATE_FEEDBACK_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.CREATE_FEEDBACK_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
