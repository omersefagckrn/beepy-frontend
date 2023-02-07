import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const changeSubscriptionAction = ({ packageCode }: accountTypes.IChangeSubscriptionRequest) => {
	return async (dispatch: accountTypes.SubscriptionChangeDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.USER_SUBSCRIPTION_CHANGE_REQUEST, request: { packageCode } });

		const response = await api.post({ endpoint: 'client/account/subscription/change', body: { package: packageCode } });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.USER_SUBSCRIPTION_CHANGE_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.USER_SUBSCRIPTION_CHANGE_FAILURE, data: response.data });
	};
};
