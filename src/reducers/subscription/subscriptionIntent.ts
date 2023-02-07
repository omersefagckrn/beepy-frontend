import { subscriptionTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const subscriptionIntentReducer = (state: subscriptionTypes.SubscriptionState = initialState, action: subscriptionTypes.SubscriptionAction): subscriptionTypes.SubscriptionState => {
	switch (action.type) {
		case subscriptionTypes.actionTypes.SUBSCRIPTION_INTENT_REQUEST:
			return {
				...state,
				...request()
			};
		case subscriptionTypes.actionTypes.SUBSCRIPTION_INTENT_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case subscriptionTypes.actionTypes.SUBSCRIPTION_INTENT_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
