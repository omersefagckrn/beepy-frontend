import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const userInvoicesReducer = (state: accountTypes.UserInvoicesState = initialState, action: accountTypes.UserInvoicesAction): accountTypes.UserInvoicesState => {
	switch (action.type) {
		case accountTypes.actionTypes.USER_INVOICES_REQUEST:
			return {
				...state,
				...request()
			};
		case accountTypes.actionTypes.USER_INVOICES_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.USER_INVOICES_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
