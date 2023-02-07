import { authTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const logoutReducer = (
        state: authTypes.LogoutState = initialState,
        action: authTypes.LogoutAction
    ): authTypes.LogoutState => {
    switch (action.type) {
        case authTypes.actionTypes.LOGOUT_REQUEST:
            return {
                ...state,
                ...request()
            }
        case authTypes.actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case authTypes.actionTypes.LOGOUT_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}