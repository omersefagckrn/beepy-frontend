import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const createChannelAction = ({ title, description, type, slug, category }: channelTypes.ICreateChannelRequest) => {
	return async (dispatch: channelTypes.CreateChannelDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.CHANNEL_CREATE_REQUEST, request: { title, description, type, slug, category } });

		const response = await api.post({ endpoint: 'client/channel/create', body: { title, description, type, slug, category } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.CHANNEL_CREATE_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.CHANNEL_CREATE_FAILURE, data: response.data });
	};
};
