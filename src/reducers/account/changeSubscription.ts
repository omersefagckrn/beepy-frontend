import { accountTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const changeSubscriptionReducer = (
        state: accountTypes.ChangeSubscriptionState = initialState,
        action: accountTypes.ChangeSubscriptionAction
    ): accountTypes.ChangeSubscriptionState => {
    switch (action.type) {
        case accountTypes.actionTypes.USER_SUBSCRIPTION_CHANGE_REQUEST:
            return {
                ...state,
                request: action.request,
                ...request()
            }
        case accountTypes.actionTypes.USER_SUBSCRIPTION_CHANGE_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case accountTypes.actionTypes.USER_SUBSCRIPTION_CHANGE_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}