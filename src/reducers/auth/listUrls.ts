import { authTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const urlsReducer = (
        state: authTypes.UrlsState = initialState,
        action: authTypes.UrlsAction
    ): authTypes.UrlsState => {
    switch (action.type) {
        case authTypes.actionTypes.LIST_URLS_REQUEST:
            return {
                ...state,
                ...request()
            }
        case authTypes.actionTypes.LIST_URLS_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case authTypes.actionTypes.LIST_URLS_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}