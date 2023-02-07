import { authTypes } from "../../@types/reducers";
import { api } from "../../helpers";

export const listCategoriesAction = () => {
  return async (dispatch: authTypes.CategoriesDispatchType) => {
    dispatch({ type: authTypes.actionTypes.LIST_CATEGORIES_REQUEST });

    const response = await api.get({ endpoint: "client/information/list/categories" });

    if (response.ok) return dispatch({ type: authTypes.actionTypes.LIST_CATEGORIES_SUCCESS, data: response.data });
    else dispatch({ type: authTypes.actionTypes.LIST_CATEGORIES_FAILURE, data: response.data });
  }
}