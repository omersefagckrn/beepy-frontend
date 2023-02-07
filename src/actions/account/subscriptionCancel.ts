import { accountTypes } from "../../@types/reducers";
import { api } from "../../helpers";

export const subscriptionCancelAction = ({ subscription, password } : accountTypes.ICancelSubscriptionRequest) => {
  return async (dispatch: accountTypes.SubscriptionCancelDispatchType) => {
    dispatch({ type: accountTypes.actionTypes.USER_SUBSCRIPTION_CANCEL_REQUEST, request: { subscription, password } });

    const response = await api.post({ endpoint: "client/account/subscription/cancel" , body: { subscription, password }});

    if (response.ok) return dispatch({ type: accountTypes.actionTypes.USER_SUBSCRIPTION_CANCEL_SUCCESS, data: response.data });
    else dispatch({ type: accountTypes.actionTypes.USER_SUBSCRIPTION_CANCEL_FAILURE, data: response.data });
  }
}