import { authTypes } from "../../@types/reducers";
import { api } from "../../helpers";

export const listUrlsAction = () => {
  return async (dispatch: authTypes.UrlsDispatchType) => {
    dispatch({ type: authTypes.actionTypes.LIST_URLS_REQUEST });

    const response = await api.get({ endpoint: "client/information/list/urls" });

    if (response.ok) return dispatch({ type: authTypes.actionTypes.LIST_URLS_SUCCESS, data: response.data });
    else dispatch({ type: authTypes.actionTypes.LIST_URLS_FAILURE, data: response.data });
  }
}