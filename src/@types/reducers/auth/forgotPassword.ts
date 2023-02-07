import { BaseState, IDataFail } from '../rootReducer';

export interface ForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordResponse {
    code: number,
    message: string,
    requirement: string,
}

export type ForgotPasswordState = BaseState & {
    data?: ForgotPasswordResponse | IDataFail ;
    request?: ForgotPasswordRequest;
}

export type ForgotPasswordAction = {
    type: string;
    data?: ForgotPasswordResponse | IDataFail;
    request?: ForgotPasswordRequest;
}

export type ForgotPasswordDispatchType = (args: ForgotPasswordAction) => ForgotPasswordAction