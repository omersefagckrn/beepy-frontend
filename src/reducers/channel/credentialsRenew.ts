import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const credentialsRenewReducer = (state: channelTypes.CredentialsRenewState = initialState, action: channelTypes.CredentialsRenewAction): channelTypes.CredentialsRenewState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_CREDENTIALS_RENEW_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_CREDENTIALS_RENEW_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_CREDENTIALS_RENEW_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
