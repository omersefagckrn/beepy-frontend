import { authTypes } from '../../@types/reducers';
import { api } from '../../helpers';
import { auth } from '../../helpers';

export const verificationCodeAction = ({ name, surname, email, country, password, timezone, code }: authTypes.IVerificationRequest) => {
	return async (dispatch: authTypes.VerificationDispatchType) => {
		dispatch({ type: authTypes.actionTypes.VERIFICATION_CODE_REQUEST, request: { name, surname, email, country, password, timezone, code } });

		const response = await api.post({ endpoint: 'client/auth/verification/code', body: { name, surname, email, country, password, timezone, code } });

		if (response.ok) {
			auth.setToken(response.data.token);
			auth.removeRegisterData();
			return dispatch({ type: authTypes.actionTypes.VERIFICATION_CODE_SUCCESS, data: response.data });
		} else dispatch({ type: authTypes.actionTypes.VERIFICATION_CODE_FAILURE, data: response.data });
	};
};
