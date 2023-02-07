import { BaseState, IDataFail } from '../rootReducer';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    requirement: string | null;
}

export type LoginState = BaseState & {
    data?: LoginResponse | IDataFail ;
    request?: LoginRequest
}

export type LoginAction = {
    type: string;
    data?: LoginResponse | IDataFail;
    request?: LoginRequest
}

export type LoginDispatchType = (args: LoginAction) => LoginAction