import { authTypes } from '../../@types/reducers';
import { api } from '../../helpers';
import { auth } from '../../helpers';

export const logoutAction = () => {
	return async (dispatch: authTypes.LogoutDispatchType) => {
		dispatch({ type: authTypes.actionTypes.LOGOUT_REQUEST });

		const response = await api.post({ endpoint: 'client/auth/logout' });
		if (response.ok) {
			auth.logout();
			return dispatch({ type: authTypes.actionTypes.LOGOUT_SUCCESS, data: response.data });
		} else dispatch({ type: authTypes.actionTypes.LOGOUT_FAILURE, data: response.data });
	};
};
