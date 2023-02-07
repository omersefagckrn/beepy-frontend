import { authTypes } from "../../@types/reducers";
import { api } from "../../helpers";
import { auth } from "../../helpers";

export const loginAction = ({ email, password }: authTypes.LoginRequest) => {
  return async (dispatch: authTypes.LoginDispatchType) => {
    dispatch({ type: authTypes.actionTypes.LOGIN_REQUEST, request: { email, password } });

    const response = await api.post({ endpoint: "client/auth/login", body: { email, password } });

    if (response.ok) {
        auth.setToken(response.data.token);
        return dispatch({ type: authTypes.actionTypes.LOGIN_SUCCESS, data: response.data });
    }
    else dispatch({ type: authTypes.actionTypes.LOGIN_FAILURE, data: response.data });
  }
}