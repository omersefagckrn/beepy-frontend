import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const deletePaymentMethodsAction = ({ payment_method }: accountTypes.IDeletePaymentMethodsRequest) => {
	return async (dispatch: accountTypes.DeletePaymentMethodsDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.USER_PAYMENT_METHODS_DELETE_REQUEST, request: { payment_method } });

		const response = await api.post({ endpoint: 'client/account/subscription/paymentMethods/delete', body: { payment_method } });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.USER_PAYMENT_METHODS_DELETE_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.USER_PAYMENT_METHODS_DELETE_FAILURE, data: response.data });
	};
};
