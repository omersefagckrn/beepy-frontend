import { accountTypes } from "../../@types/reducers";
import { api } from "../../helpers";

export const userSubscriptionResumeAction = ({ subscription } : accountTypes.ISubscriptionResumeRequest) => {
  return async (dispatch: accountTypes.UserSubscriptionResumeDispatchType) => {
    dispatch({ type: accountTypes.actionTypes.USER_SUBSCRIPTION_RESUME_REQUEST, request: {subscription} });

    const response = await api.post({ endpoint: "client/account/subscription/resume" , body: { subscription }} );

    if (response.ok) return dispatch({ type: accountTypes.actionTypes.USER_SUBSCRIPTION_RESUME_SUCCESS, data: response.data });
    else dispatch({ type: accountTypes.actionTypes.USER_SUBSCRIPTION_RESUME_FAILURE, data: response.data });
  }
}