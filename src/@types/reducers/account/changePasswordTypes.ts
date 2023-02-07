import { BaseState, IDataFail } from '../rootReducer';

export interface IChangePassword {
	requirement: string;
	status: boolean;
}
export interface IChangePasswordRequest {
	current_password: string;
	password: string;
}
export type ChangePasswordState = BaseState & {
	data?: IChangePassword | IDataFail;
	request?: IChangePasswordRequest;
};

export type ChangePasswordAction = {
	type: string;
	data?: IChangePassword | IDataFail;
	request?: IChangePasswordRequest;
};

export type ChangePasswordDispatchType = (args: ChangePasswordAction) => ChangePasswordAction;
