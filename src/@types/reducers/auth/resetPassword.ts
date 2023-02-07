import { BaseState, IDataFail } from '../rootReducer';

export interface ResetPasswordRequest {
	access: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export interface ResetPasswordResponse {
	code: number;
	message: string;
	requirement: string;
}

export type ResetPasswordState = BaseState & {
	data?: ResetPasswordResponse | IDataFail;
	request?: ResetPasswordRequest;
};

export type ResetPasswordAction = {
	type: string;
	data?: ResetPasswordResponse | IDataFail;
	request?: ResetPasswordRequest;
};

export type ResetPasswordDispatchType = (args: ResetPasswordAction) => ResetPasswordAction;
