import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const changePasswordReducer = (state: accountTypes.ChangePasswordState = initialState, action: accountTypes.ChangePasswordAction): accountTypes.ChangePasswordState => {
	switch (action.type) {
		case accountTypes.actionTypes.CHANGE_PASSWORD_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case accountTypes.actionTypes.CHANGE_PASSWORD_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.CHANGE_PASSWORD_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
