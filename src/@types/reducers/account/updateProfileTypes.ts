import { BaseState, IDataFail } from '../rootReducer';

export interface IUpdateProfile {
	requirement: string | null;
	status: boolean;
}
export interface IUpdateProfileRequest {
	name: string;
	surname: string;
	email: string;
	password: string;
	country: string;
	timezone: string;
}
export type UpdateProileState = BaseState & {
	data?: IUpdateProfile | IDataFail;
	request?: IUpdateProfileRequest
};

export type UpdateProfileAction = {
	type: string;
	data?: IUpdateProfile | IDataFail;
	request?: IUpdateProfileRequest
};

export type UpdateProfileDispatchType = (args: UpdateProfileAction) => UpdateProfileAction;
