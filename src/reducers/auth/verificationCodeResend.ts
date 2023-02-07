import { authTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const verificationCodeResendReducer = (
        state: authTypes.VerificationCodeResendState = initialState,
        action: authTypes.VerificationCodeResendAction
    ): authTypes.VerificationCodeResendState => {
    switch (action.type) {
        case authTypes.actionTypes.VERIFICATION_CODE_RESEND_REQUEST:
            return {
                ...state,
                ...request()
            }
        case authTypes.actionTypes.VERIFICATION_CODE_RESEND_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case authTypes.actionTypes.VERIFICATION_CODE_RESEND_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}