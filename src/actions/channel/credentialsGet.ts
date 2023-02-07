import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const credentialsGetAction = ({ channel }: channelTypes.ICredentialsGetRequest) => {
	return async (dispatch: channelTypes.CredentialsGetDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_CREDENTIALS_GET_REQUEST, request: { channel } });

		const response = await api.post({ endpoint: 'client/channel/credentials/get', body: { channel } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_CREDENTIALS_GET_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_CREDENTIALS_GET_FAILURE });
	};
};
