import { channelTypes } from '../../@types/reducers';
import { initialState, request, success, failure } from '../rootReducer';

export const uploadLogoReducer = (state: channelTypes.UploadLogoState = initialState, action: channelTypes.UploadLogoAction): channelTypes.UploadLogoState => {
	switch (action.type) {
		case channelTypes.actionTypes.UPLOAD_LOGO_REQUEST:
			return {
				...state,
				...request(),
				data: action.data
			};
		case channelTypes.actionTypes.UPLOAD_LOGO_SUCCESS:
			return {
				...state,
				...success(),
				data: action.data
			};
		case channelTypes.actionTypes.UPLOAD_LOGO_FAILURE:
			return {
				...state,
				...failure(),
				data: action.data
			};
	}
	return state;
};
