import { authTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const forgotPasswordReducer = (state: authTypes.ForgotPasswordState = initialState, action: authTypes.ForgotPasswordAction): authTypes.ForgotPasswordState => {
	switch (action.type) {
		case authTypes.actionTypes.FORGOT_PASSWORD_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case authTypes.actionTypes.FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case authTypes.actionTypes.FORGOT_PASSWORD_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
