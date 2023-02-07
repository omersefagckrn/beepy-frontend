import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const changePasswordAction = ({ current_password, password }: accountTypes.IChangePasswordRequest) => {
	return async (dispatch: accountTypes.ChangePasswordDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.CHANGE_PASSWORD_REQUEST, request: {current_password, password} });

		const response = await api.post({ endpoint: 'client/account/password/change', body: { current_password, password } });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.CHANGE_PASSWORD_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.CHANGE_PASSWORD_FAILURE, data: response.data });
	};
};
