import { authTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const registerReducer = (
        state: authTypes.RegisterState = initialState,
        action: authTypes.RegisterAction
    ): authTypes.RegisterState => {
    switch (action.type) {
        case authTypes.actionTypes.REGISTER_REQUEST:
            return {
                ...state,
                request: action.request,
                ...request()
            }
        case authTypes.actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case authTypes.actionTypes.REGISTER_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}