import { authTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const listTimeZonesReducer = (
        state: authTypes.TimeZonesState = initialState,
        action: authTypes.TimeZonesAction
    ): authTypes.TimeZonesState => {
    switch (action.type) {
        case authTypes.actionTypes.LIST_TIMEZONES_REQUEST:
            return {
                ...state,
                ...request()
            }
        case authTypes.actionTypes.LIST_TIMEZONES_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case authTypes.actionTypes.LIST_TIMEZONES_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}