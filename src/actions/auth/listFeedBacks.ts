import { authTypes } from "../../@types/reducers";
import { api } from "../../helpers";

export const listFeedBacksAction = () => {
  return async (dispatch: authTypes.FeedBacksDispatchType) => {
    dispatch({ type: authTypes.actionTypes.LIST_FEEDBACKS_REQUEST });

    const response = await api.get({ endpoint: "client/information/list/feedbacks" });

    if (response.ok) return dispatch({ type: authTypes.actionTypes.LIST_FEEDBACKS_SUCCESS, data: response.data });
    else dispatch({ type: authTypes.actionTypes.LIST_FEEDBACKS_FAILURE, data: response.data });
  }
}