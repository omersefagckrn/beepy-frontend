import { BaseState, IDataFail } from '../rootReducer';

export interface IVerificationRequest {
    name: string,
    surname: string,
    email: string,
    country: string,
    password: string,
    timezone: string,
    code: string,
}

export interface IVerificationResponse {
    status: string,
    token: string,
    requirement: null,
}

export type VerificationState = BaseState & {
    data?: IVerificationResponse | IDataFail;
    request?: IVerificationRequest;
}

export type VerificationAction = {
    type: string;
    data?: IVerificationResponse | IDataFail;
    request?: IVerificationRequest;
}

export type VerificationDispatchType = (args: VerificationAction) => VerificationAction