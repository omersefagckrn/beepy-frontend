import { authTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const countriesReducer = (
        state: authTypes.CountriesState = initialState,
        action: authTypes.CountriesAction
    ): authTypes.CountriesState => {
    switch (action.type) {
        case authTypes.actionTypes.LIST_COUNTRIES_REQUEST:
            return {
                ...state,
                ...request()
            }
        case authTypes.actionTypes.LIST_COUNTRIES_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case authTypes.actionTypes.LIST_COUNTRIES_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}