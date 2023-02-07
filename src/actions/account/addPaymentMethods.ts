import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const addPaymentMethodsAction = ({ payment_method }: accountTypes.IAddPaymentMethodsRequest) => {
	return async (dispatch: accountTypes.AddPaymentMethodsDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.USER_PAYMENT_METHODS_ADD_REQUEST, request: { payment_method } });

		const response = await api.post({ endpoint: 'client/account/subscription/paymentMethods/new', body: { payment_method } });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.USER_PAYMENT_METHODS_ADD_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.USER_PAYMENT_METHODS_ADD_FAILURE, data: response.data });
	};
};
