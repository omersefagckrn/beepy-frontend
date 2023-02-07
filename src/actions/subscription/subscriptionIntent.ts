import { subscriptionTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const subscriptionIntentAction = () => {
	return async (dispatch: subscriptionTypes.SubscriptionDispatchType) => {
		dispatch({ type: subscriptionTypes.actionTypes.SUBSCRIPTION_INTENT_REQUEST});

		const response = await api.post({ endpoint: 'client/subscription/intent' });

		if (response.ok) return dispatch({ type: subscriptionTypes.actionTypes.SUBSCRIPTION_INTENT_SUCCESS, data: response.data });
		else return dispatch({type: subscriptionTypes.actionTypes.SUBSCRIPTION_INTENT_FAILURE, data: response.data });
	};
};
