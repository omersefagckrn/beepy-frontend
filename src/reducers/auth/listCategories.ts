import { authTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const categoriesReducer = (
        state: authTypes.CategoriesState = initialState,
        action: authTypes.CategoriesAction
    ): authTypes.CategoriesState => {
    switch (action.type) {
        case authTypes.actionTypes.LIST_CATEGORIES_REQUEST:
            return {
                ...state,
                ...request()
            }
        case authTypes.actionTypes.LIST_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case authTypes.actionTypes.LIST_CATEGORIES_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}