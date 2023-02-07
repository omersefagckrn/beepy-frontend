import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const updateProfileAction = ({ name, surname, email, password, country, timezone }: accountTypes.IUpdateProfileRequest ) => {
	return async (dispatch: accountTypes.UpdateProfileDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.UPDATE_USER_PROFILE_REQUEST, request: { name, surname, email, password, country, timezone} });

		const response = await api.post({ endpoint: 'client/account/profile/update', body: { name, surname, email, password, country, timezone } });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.UPDATE_USER_PROFILE_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.UPDATE_USER_PROFILE_FAILURE, data: response.data });
	};
};
