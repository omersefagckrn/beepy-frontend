import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const deviceListAction = () => {
	return async (dispatch: accountTypes.DeviceListDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.DEVICE_LIST_REQUEST });

		const response = await api.post({ endpoint: 'client/account/device/list' });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.DEVICE_LIST_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.DEVICE_LIST_FAILURE, data: response.data });
	};
};
