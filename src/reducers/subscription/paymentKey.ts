import { subscriptionTypes } from "../../@types/reducers"; 
import { initialState, request, success, failure } from '../rootReducer';

export const paymentKeyReducer = (
    state: subscriptionTypes.PaymentKeyState = initialState,
    action: subscriptionTypes.PaymentKeyAction,
): subscriptionTypes.PaymentKeyState => {
    switch(action.type)
    {
        case subscriptionTypes.actionTypes.SUBSCRIPTION_PAYMENT_KEY_REQUEST:
            return {
                ...state,
                ...request()
            }
        case subscriptionTypes.actionTypes.SUBSCRIPTION_PAYMENT_KEY_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case subscriptionTypes.actionTypes.SUBSCRIPTION_PAYMENT_KEY_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state;
}