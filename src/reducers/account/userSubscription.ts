import { accountTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const userSubscriptionReducer = (
        state: accountTypes.UserSubscriptionState = initialState,
        action: accountTypes.UserSubscriptionAction
    ): accountTypes.UserSubscriptionState => {
    switch (action.type) {
        case accountTypes.actionTypes.USER_SUBSCRIPTION_REQUEST:
            return {
                ...state,
                ...request()
            }
        case accountTypes.actionTypes.USER_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case accountTypes.actionTypes.USER_SUBSCRIPTION_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}