import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const deviceListReducer = (state: accountTypes.DeviceListState = initialState, action: accountTypes.DeviceListAction): accountTypes.DeviceListState => {
	switch (action.type) {
		case accountTypes.actionTypes.DEVICE_LIST_REQUEST:
			return {
				...state,
				...request()
			};
		case accountTypes.actionTypes.DEVICE_LIST_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.DEVICE_LIST_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
