import { subscriptionTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const paymentKeyAction = () => {
	return async (dispatch: subscriptionTypes.PaymentKeyDispatchType) => {
		dispatch({ type: subscriptionTypes.actionTypes.SUBSCRIPTION_PAYMENT_KEY_REQUEST });

		const response = await api.post({ endpoint: 'client/subscription/payment/key'});

		if (response.ok) return dispatch({ type: subscriptionTypes.actionTypes.SUBSCRIPTION_PAYMENT_KEY_SUCCESS, data: response.data });
		else return dispatch({type: subscriptionTypes.actionTypes.SUBSCRIPTION_PAYMENT_KEY_FAILURE, data: response.data });
	};
};
