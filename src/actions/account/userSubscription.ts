import { accountTypes } from "../../@types/reducers";
import { api } from "../../helpers";

export const userSubscriptionAction = () => {
  return async (dispatch: accountTypes.UserSubscriptionDispatchType) => {
    dispatch({ type: accountTypes.actionTypes.USER_SUBSCRIPTION_REQUEST });

    const response = await api.post({ endpoint: "client/account/subscription" });

    if (response.ok) return dispatch({ type: accountTypes.actionTypes.USER_SUBSCRIPTION_SUCCESS, data: response.data });
    else dispatch({ type: accountTypes.actionTypes.USER_SUBSCRIPTION_FAILURE, data: response.data });
  }
}