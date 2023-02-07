import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const paymentMethodsReducer = (state: accountTypes.PaymenMethodsState = initialState, action: accountTypes.PaymentMethodsAction): accountTypes.PaymenMethodsState => {
	switch (action.type) {
		case accountTypes.actionTypes.USER_PAYMENT_METHODS_REQUEST:
			return {
				...state,
				...request()
			};
		case accountTypes.actionTypes.USER_PAYMENT_METHODS_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.USER_PAYMENT_METHODS_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
