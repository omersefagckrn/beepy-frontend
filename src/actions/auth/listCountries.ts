import { authTypes } from "../../@types/reducers";
import { api } from "../../helpers";

export const listCountriesAction = () => {
  return async (dispatch: authTypes.CountriesDispatchType) => {
    dispatch({ type: authTypes.actionTypes.LIST_COUNTRIES_REQUEST });

    const response = await api.get({ endpoint: "client/information/list/countries" });

    if (response.ok) return dispatch({ type: authTypes.actionTypes.LIST_COUNTRIES_SUCCESS, data: response.data });
    else dispatch({ type: authTypes.actionTypes.LIST_COUNTRIES_FAILURE, data: response.data });
  }
}