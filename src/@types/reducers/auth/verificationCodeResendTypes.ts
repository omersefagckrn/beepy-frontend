import { BaseState, IDataFail } from '../rootReducer';

export interface IVerificationCodeResendResponse {
    status: boolean;
    token: string,
    requirement: string;
}

export type VerificationCodeResendState = BaseState & {
    data?: IVerificationCodeResendResponse | IDataFail ;
}

export type VerificationCodeResendAction = {
    type: string;
    data?: IVerificationCodeResendResponse | IDataFail ;
}

export type VerificationCodeResendDispatchType = (args: VerificationCodeResendAction) => VerificationCodeResendAction