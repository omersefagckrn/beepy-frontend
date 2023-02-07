import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const deletePaymentMethodsReducer = (state: accountTypes.DeletePaymentMethodState = initialState, action: accountTypes.DeletePaymentMethodAction): accountTypes.DeletePaymentMethodState => {
	switch (action.type) {
		case accountTypes.actionTypes.USER_PAYMENT_METHODS_DELETE_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case accountTypes.actionTypes.USER_PAYMENT_METHODS_DELETE_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.USER_PAYMENT_METHODS_DELETE_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
