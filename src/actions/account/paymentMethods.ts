import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const paymentMethodsAction = () => {
	return async (dispatch: accountTypes.PaymentMethodsDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.USER_PAYMENT_METHODS_REQUEST });

		const response = await api.post({ endpoint: 'client/account/subscription/paymentMethods' });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.USER_PAYMENT_METHODS_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.USER_PAYMENT_METHODS_FAILURE, data: response.data });
	};
};
