import { authTypes } from "../../@types/reducers";
import { api } from "../../helpers";

export const forgotPasswordAction = ({ email }: authTypes.ForgotPasswordRequest) => {
  return async (dispatch: authTypes.ForgotPasswordDispatchType) => {
    dispatch({ type: authTypes.actionTypes.FORGOT_PASSWORD_REQUEST,  request: { email } });

    const response = await api.post({ endpoint: "client/auth/password/forgot", body: { email } });

    if (response.ok) {
        return dispatch({ type: authTypes.actionTypes.FORGOT_PASSWORD_SUCCESS, data: response.data });
    }
    else dispatch({ type: authTypes.actionTypes.FORGOT_PASSWORD_FAILURE, data: response.data });
  }
}