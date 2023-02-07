import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const updateProfileReducer = (state: accountTypes.UpdateProileState = initialState, action: accountTypes.UpdateProfileAction): accountTypes.UpdateProileState => {
	switch (action.type) {
		case accountTypes.actionTypes.UPDATE_USER_PROFILE_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case accountTypes.actionTypes.UPDATE_USER_PROFILE_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.UPDATE_USER_PROFILE_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
