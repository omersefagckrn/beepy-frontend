import { authTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const verificationCodeReducer = (
        state: authTypes.VerificationState = initialState,
        action: authTypes.VerificationAction
    ): authTypes.VerificationState => {
    switch (action.type) {
        case authTypes.actionTypes.VERIFICATION_CODE_REQUEST:
            return {
                ...state,
                request: action.request,
                ...request()
            }
        case authTypes.actionTypes.VERIFICATION_CODE_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case authTypes.actionTypes.VERIFICATION_CODE_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}