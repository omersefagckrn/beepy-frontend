import { authTypes } from '../../@types/reducers';
import { api } from '../../helpers';
import { auth } from '../../helpers';

export const registerAction = ({ name, surname, email, country, password, timezone }: authTypes.IRegisterRequest) => {
	return async (dispatch: authTypes.RegisterDispatchType) => {
		dispatch({ type: authTypes.actionTypes.REGISTER_REQUEST, request: { name, surname, email, country, password, timezone } });

		const response = await api.post({ endpoint: 'client/auth/register', body: { name, surname, email, country, password, timezone } });

		if (response.ok) {
			auth.register({ name, surname, email, country, password, timezone });
			auth.setToken(response.data.token);
			return dispatch({ type: authTypes.actionTypes.REGISTER_SUCCESS, data: response.data });
		} else dispatch({ type: authTypes.actionTypes.REGISTER_FAILURE, data: response.data });
	};
};
