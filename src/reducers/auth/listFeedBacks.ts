import { authTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const feedBacksReducer = (
        state: authTypes.FeedBacksState = initialState,
        action: authTypes.FeedBacksAction
    ): authTypes.FeedBacksState => {
    switch (action.type) {
        case authTypes.actionTypes.LIST_FEEDBACKS_REQUEST:
            return {
                ...state,
                ...request()
            }
        case authTypes.actionTypes.LIST_FEEDBACKS_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case authTypes.actionTypes.LIST_FEEDBACKS_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}