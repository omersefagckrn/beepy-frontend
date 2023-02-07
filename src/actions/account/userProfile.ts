import { accountTypes } from "../../@types/reducers";
import { api } from "../../helpers";

export const userProfileAction = () => {
  return async (dispatch: accountTypes.UserProfileDispatchType) => {
    dispatch({ type: accountTypes.actionTypes.GET_USER_PROFILE_REQUEST });

    const response = await api.post({ endpoint: "client/account/profile" });

    if (response.ok) return dispatch({ type: accountTypes.actionTypes.GET_USER_PROFILE_SUCCESS, data: response.data });
    else dispatch({ type: accountTypes.actionTypes.GET_USER_PROFILE_FAILURE, data: response.data });
  }
}