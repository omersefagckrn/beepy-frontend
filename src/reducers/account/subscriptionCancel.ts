import { accountTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const subscriptionCancelReducer = (
        state: accountTypes.SubscriptionCancelState = initialState,
        action: accountTypes.SubscriptionCancelAction
    ): accountTypes.SubscriptionCancelState => {
    switch (action.type) {
        case accountTypes.actionTypes.USER_SUBSCRIPTION_CANCEL_REQUEST:
            return {
                ...state,
                request: action.request,
                ...request()
            }
        case accountTypes.actionTypes.USER_SUBSCRIPTION_CANCEL_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case accountTypes.actionTypes.USER_SUBSCRIPTION_CANCEL_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}