import { BaseState, IDataFail } from '../rootReducer';

export interface IRegisterRequest {
    name: string;
    surname: string;
    email: string;
    country: string;
    password: string;
    timezone: string;
}

export interface IRegisterResponse {
    token: string;
    requirement: string | null;
}

export type RegisterState = BaseState & {
    data?: IRegisterResponse | IDataFail ;
    request?: IRegisterRequest
}

export type RegisterAction = {
    type: string;
    data?: IRegisterResponse | IDataFail;
    request?: IRegisterRequest;
}


export type RegisterDispatchType = (args: RegisterAction) => RegisterAction