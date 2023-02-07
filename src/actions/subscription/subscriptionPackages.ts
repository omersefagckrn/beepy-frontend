import { subscriptionTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const subscriptionPackagesAction = () => {
	return async (dispatch: subscriptionTypes.SubscriptionPackagesDispatchType) => {
		dispatch({ type: subscriptionTypes.actionTypes.SUBSCRIPTION_PACKAGES_REQUEST});

		const response = await api.post({ endpoint: 'client/subscription/packages'});

		if (response.ok) return dispatch({ type: subscriptionTypes.actionTypes.SUBSCRIPTION_PACKAGES_SUCCESS, data: response.data });
		else return dispatch({type: subscriptionTypes.actionTypes.SUBSCRIPTION_PACKAGES_FAILURE, data: response.data });
	};
};
