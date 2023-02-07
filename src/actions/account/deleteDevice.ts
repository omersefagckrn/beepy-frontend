import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const deleteDeviceAction = ({ guid }: accountTypes.IDeleteDeviceRequest) => {
	return async (dispatch: accountTypes.DeleteDeviceDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.DEVICE_DELETE_REQUEST, request: { guid } });

		const response = await api.post({ endpoint: 'client/account/device/delete', body: { guid } });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.DEVICE_DELETE_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.DEVICE_DELETE_FAILURE, data: response.data });
	};
};
