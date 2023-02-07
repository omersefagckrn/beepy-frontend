import { accountTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const updateBillingAddressAction = ({ address, country, city, state, zipcode }: accountTypes.IUpdateBillingAddressRequest) => {
	return async (dispatch: accountTypes.UpdateBillingAddressDispatchType) => {
		dispatch({ type: accountTypes.actionTypes.UPDATE_BILLING_ADDRESS_REQUEST, request: { address, country, city, state, zipcode} });

		const response = await api.post({ endpoint: 'client/account/profile/update/address', body: { address, country, city, state, zipcode } });

		if (response.ok) return dispatch({ type: accountTypes.actionTypes.UPDATE_BILLING_ADDRESS_SUCCESS, data: response.data });
		else dispatch({ type: accountTypes.actionTypes.UPDATE_BILLING_ADDRESS_FAILURE, data: response.data });
	};
};
