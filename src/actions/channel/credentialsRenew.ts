import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const credentialsRenewAction = ({ channel, password }: channelTypes.ICredentialsRenewRequest) => {
	return async (dispatch: channelTypes.CredentialsRenewDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_CREDENTIALS_RENEW_REQUEST, request: { channel, password } });

		const response = await api.post({ endpoint: 'client/channel/credentials/renew', body: { channel, password } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_CREDENTIALS_RENEW_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_CREDENTIALS_RENEW_FAILURE, data: response.data });
	};
};
