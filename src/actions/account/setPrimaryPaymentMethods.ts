import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const setPrimaryPaymentMethodsAction = ({ payment_method }: accountTypes.ISetPrimaryPaymentMethodsRequest) => {
	return async (dispatch: accountTypes.SetPrimaryPaymentMethodsDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.USER_PAYMENT_METHODS_SET_PRIMARY_REQUEST, request: { payment_method } });

		const response = await api.post({ endpoint: 'client/account/subscription/paymentMethods/setPrimary', body: { payment_method } });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.USER_PAYMENT_METHODS_SET_PRIMARY_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.USER_PAYMENT_METHODS_SET_PRIMARY_FAILURE, data: response.data });
	};
};
