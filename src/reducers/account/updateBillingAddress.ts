import { accountTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const updateBillingAddressReducer = (state: accountTypes.UpdateBillingAddressState = initialState, action: accountTypes.UpdateBillingAddressAction): accountTypes.UpdateBillingAddressState => {
	switch (action.type) {
		case accountTypes.actionTypes.UPDATE_BILLING_ADDRESS_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case accountTypes.actionTypes.UPDATE_BILLING_ADDRESS_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case accountTypes.actionTypes.UPDATE_BILLING_ADDRESS_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
