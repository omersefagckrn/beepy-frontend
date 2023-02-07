import { authTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const resetPasswordReducer = (state: authTypes.ResetPasswordState = initialState, action: authTypes.ResetPasswordAction): authTypes.ResetPasswordState => {
	switch (action.type) {
		case authTypes.actionTypes.RESET_PASSWORD_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case authTypes.actionTypes.RESET_PASSWORD_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case authTypes.actionTypes.RESET_PASSWORD_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
