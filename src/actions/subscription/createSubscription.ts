import { subscriptionTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const createSubscriptionAction = ({ _package, payment_method }: subscriptionTypes.ICreateSubscriptionRequest) => {
	return async (dispatch: subscriptionTypes.CreateSubscriptionDispatchType) => {
		dispatch({ type: subscriptionTypes.actionTypes.SUBSCRIPTION_CREATE_REQUEST, request: { _package, payment_method }});

		const response = await api.post({ endpoint: 'client/subscription/create', body: {package: _package, payment_method}});

		if (response.ok) return dispatch({ type: subscriptionTypes.actionTypes.SUBSCRIPTION_CREATE_SUCCESS, data: response.data });
		else return dispatch({type: subscriptionTypes.actionTypes.SUBSCRIPTION_CREATE_FAILURE, data: response.data });
	};
};
