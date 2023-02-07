import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const deleteDeviceReducer = (state: accountTypes.DeleteDeviceState = initialState, action: accountTypes.DeleteDeviceAction): accountTypes.DeleteDeviceState => {
	switch (action.type) {
		case accountTypes.actionTypes.DEVICE_DELETE_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case accountTypes.actionTypes.DEVICE_DELETE_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.DEVICE_DELETE_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
