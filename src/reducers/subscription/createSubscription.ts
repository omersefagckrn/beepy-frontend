import { subscriptionTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const createSubscriptionReducer = (state: subscriptionTypes.CreateSubscriptionState = initialState, action: subscriptionTypes.CreateSubscriptionAction): subscriptionTypes.CreateSubscriptionState => {
	switch (action.type) {
		case subscriptionTypes.actionTypes.SUBSCRIPTION_CREATE_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case subscriptionTypes.actionTypes.SUBSCRIPTION_CREATE_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case subscriptionTypes.actionTypes.SUBSCRIPTION_CREATE_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
