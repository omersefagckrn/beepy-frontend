import { authTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const loginReducer = (
        state: authTypes.LoginState = initialState,
        action: authTypes.LoginAction
    ): authTypes.LoginState => {
    switch (action.type) {
        case authTypes.actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                request: action.request,
                ...request()
            }
        case authTypes.actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case authTypes.actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}