import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const userInvoicesAction = () => {
	return async (dispatch: accountTypes.UserInvoicesDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.USER_INVOICES_REQUEST });

		const response = await api.post({ endpoint: 'client/account/subscription/invoices' });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.USER_INVOICES_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.USER_INVOICES_FAILURE, data: response.data });
	};
};
