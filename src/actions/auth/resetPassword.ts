import { authTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const resetPasswordAction = ({ access, email, password, password_confirmation }: authTypes.ResetPasswordRequest) => {
	return async (dispatch: authTypes.ResetPasswordDispatchType) => {
		dispatch({ type: authTypes.actionTypes.RESET_PASSWORD_REQUEST, request: { access, email, password, password_confirmation } });

		const response = await api.post({ endpoint: 'client/auth/password/reset', body: { access, email, password, password_confirmation } });

		if (response.ok) {
			return dispatch({ type: authTypes.actionTypes.RESET_PASSWORD_SUCCESS, data: response.data });
		} else dispatch({ type: authTypes.actionTypes.RESET_PASSWORD_FAILURE, data: response.data });
	};
};
