import { authTypes } from "../../@types/reducers";
import { api } from "../../helpers";

export const listTimezonesAction = () => {
  return async (dispatch: authTypes.TimeZonesDispatchType) => {
    dispatch({ type: authTypes.actionTypes.LIST_TIMEZONES_REQUEST });

    const response = await api.get({ endpoint: "client/information/list/timezones" });

    if (response.ok) return dispatch({ type: authTypes.actionTypes.LIST_TIMEZONES_SUCCESS, data: response.data });
    else dispatch({ type: authTypes.actionTypes.LIST_TIMEZONES_FAILURE, data: response.data });
  }
}