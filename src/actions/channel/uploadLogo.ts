import { channelTypes } from '../../@types/reducers';
import { api } from '../../helpers';

export const uploadLogoAction = ({ logo, channel }: channelTypes.IUploadLogoRequest) => {
	return async (dispatch: channelTypes.UploadLogoDispatchType) => {
		dispatch({ type: channelTypes.actionTypes.UPLOAD_LOGO_REQUEST, request: { logo, channel } });

		const response = await api.upload({ endpoint: 'client/channel/logo/upload', file: { name: 'logo', file: logo }, body: { channel } });

		if (response.ok) {
			return dispatch({ type: channelTypes.actionTypes.UPLOAD_LOGO_SUCCESS, data: response.data });
		} else dispatch({ type: channelTypes.actionTypes.UPLOAD_LOGO_FAILURE, data: response.data });
	};
};
