import { accountTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const userSubscriptionResumeReducer = (
        state: accountTypes.UserSubscriptionResumeState = initialState,
        action: accountTypes.UserSubscriptionResumeAction
    ): accountTypes.UserSubscriptionResumeState => {
    switch (action.type) {
        case accountTypes.actionTypes.USER_SUBSCRIPTION_RESUME_REQUEST:
            return {
                ...state,
                request: action.request,
                ...request()
            }
        case accountTypes.actionTypes.USER_SUBSCRIPTION_RESUME_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case accountTypes.actionTypes.USER_SUBSCRIPTION_RESUME_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}