import { authTypes } from "../../@types/reducers";
import { api } from "../../helpers";
import { auth } from "../../helpers";

export const verificationCodeResendAction = () => {
  return async (dispatch: authTypes.VerificationCodeResendDispatchType) => {
    dispatch({ type: authTypes.actionTypes.VERIFICATION_CODE_RESEND_REQUEST });

    const response = await api.post({ endpoint: "client/auth/verification/code/resend"});

    if (response.ok) {
        auth.setToken(response.data.token);
        return dispatch({ type: authTypes.actionTypes.VERIFICATION_CODE_RESEND_SUCCESS, data: response.data });
    }
    else dispatch({ type: authTypes.actionTypes.VERIFICATION_CODE_RESEND_FAILURE, data: response.data });
  }
}