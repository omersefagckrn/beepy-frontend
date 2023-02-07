import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const setPrimaryPaymentMethodsReducer = (state: accountTypes.SetPrimaryPaymentMethodState = initialState, action: accountTypes.SetPrimaryPaymentMethodsAction): accountTypes.SetPrimaryPaymentMethodState => {
	switch (action.type) {
		case accountTypes.actionTypes.USER_PAYMENT_METHODS_SET_PRIMARY_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case accountTypes.actionTypes.USER_PAYMENT_METHODS_SET_PRIMARY_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.USER_PAYMENT_METHODS_SET_PRIMARY_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
