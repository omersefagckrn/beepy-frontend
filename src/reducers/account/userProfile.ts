import { accountTypes } from "../../@types/reducers"
import { initialState, request, success, failure } from "../rootReducer"

export const userProfileReducer = (
        state: accountTypes.UserProfileState = initialState,
        action: accountTypes.UserProfileAction
    ): accountTypes.UserProfileState => {
    switch (action.type) {
        case accountTypes.actionTypes.GET_USER_PROFILE_REQUEST:
            return {
                ...state,
                ...request()
            }
        case accountTypes.actionTypes.GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case accountTypes.actionTypes.GET_USER_PROFILE_FAILURE:
            return {
                ...state,
                ...failure(),
                data: action.data
            }
    }
    return state
}