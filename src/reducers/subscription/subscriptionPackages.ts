import { subscriptionTypes } from "../../@types/reducers"; 
import { initialState, request, success, failure } from '../rootReducer';

export const subscriptionPackagesReducer = (
    state: subscriptionTypes.SubscriptionPackagesState = initialState,
    action: subscriptionTypes.SubscriptionPackagesAction,
): subscriptionTypes.SubscriptionPackagesState => {
    switch(action.type)
    {
        case subscriptionTypes.actionTypes.SUBSCRIPTION_PACKAGES_REQUEST:
            return {
                ...state,
                ...request()
            }
        case subscriptionTypes.actionTypes.SUBSCRIPTION_PACKAGES_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case subscriptionTypes.actionTypes.SUBSCRIPTION_PACKAGES_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state;
}