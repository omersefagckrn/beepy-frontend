import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const credentialsGetReducer = (state: channelTypes.CredentialsGetState = initialState, action: channelTypes.CredentialsGetAction): channelTypes.CredentialsGetState => {
	switch (action.type) {
		case channelTypes.actionTypes.CHANNEL_CREDENTIALS_GET_REQUEST:
			return {
				...state,
				request: action.request,
				...request()
			};
		case channelTypes.actionTypes.CHANNEL_CREDENTIALS_GET_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.CHANNEL_CREDENTIALS_GET_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
