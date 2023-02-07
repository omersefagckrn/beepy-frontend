import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const addPaymentMethodReducer = (state: accountTypes.AddPaymentMethodState = initialState, action: accountTypes.AddPaymentMethodsAction): accountTypes.AddPaymentMethodState => {
	switch (action.type) {
		case accountTypes.actionTypes.USER_PAYMENT_METHODS_ADD_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case accountTypes.actionTypes.USER_PAYMENT_METHODS_ADD_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.USER_PAYMENT_METHODS_ADD_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
