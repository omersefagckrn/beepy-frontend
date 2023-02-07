import { BaseState, IDataFail } from '../rootReducer';

export interface IUploadLogo {
	status: boolean;
	requirement: string | null;
}

export type IUploadLogoRequest = {
	channel: string;
	logo: File;
};

export type UploadLogoState = BaseState & {
	data?: IUploadLogo | IDataFail;
	request?: IUploadLogoRequest;
};

export type UploadLogoAction = {
	type: string;
	data?: IUploadLogo | IDataFail;
	request?: IUploadLogoRequest;
};

export type UploadLogoDispatchType = (args: UploadLogoAction) => UploadLogoAction;
